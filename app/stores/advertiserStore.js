var marty = require('marty');

var advertiserConstants = require('../constants/advertiserConstants');
var advertiserApi = require('../sources/advertiserApi');
var advertiserActionCreators = require('../actions/advertiserActionCreators');

var advertiserStore = marty.createStore({

  handlers: {
    receiveAdvertisers: advertiserConstants.RECEIVE_ADVERTISERS,
    createAdvertiser: advertiserConstants.CREATE_ADVERTISER,

    refreshAdvertisers: advertiserConstants.REFRESH_ADVERTISERS
  },

  getInitialState: function() {
    advertiserActionCreators.refreshAdvertisers();
    
    return { advertisers: {} };
  },

  receiveAdvertisers: function(advertisers) {
    this.state.advertisers = this.state.advertisers || {};
    advertisers.forEach(function(advertiser) {
      this.state.advertisers[advertiser.id] = advertiser;
    }, this);
    
    this.hasChanged();

  },

  getAdvertiser: function(id) {
    return this.fetch({
      id: 'GET_ADVERTISER',
      locally: function() {
        return this.state.advertisers ? this.state.advertisers[id] : undefined;
      },
      remotely: function() {
        return advertiserApi.getAdvertiser(id);
      }
    });
  },

  refreshAdvertisers: function() {
    advertiserApi.getAllAdvertisers();
  },

  createAdvertiser: function(advertiser, options) {
    if(typeof options.pending == 'function') options.pending();
    advertiserApi.createAdvertiser(advertiser)
      .then(function(res) {
        if(typeof options.success == 'function') options.success(res.body);
        return res;
      }.bind(advertiser))
      .catch(function(er) {
        if(typeof options.error == 'function') options.error();
        return er;
      });
  }

});

module.exports = advertiserStore;
