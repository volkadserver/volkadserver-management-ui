import marty from "marty";
import advertiserConstants from "../constants/advertiserConstants";
import advertiserApi from "../sources/advertiserApi";
import advertiserActionCreators from "../actions/advertiserActionCreators";

var advertiserStore = marty.createStore({

  handlers: {
    receiveAdvertisers: advertiserConstants.RECEIVE_ADVERTISERS,
    createAdvertiser: advertiserConstants.CREATE_ADVERTISER,

    refreshAdvertisers: advertiserConstants.REFRESH_ADVERTISERS
  },

  getInitialState() {
    advertiserActionCreators.refreshAdvertisers();
    
  },

  receiveAdvertisers(advertisers) {
    this.state.advertisers = this.state.advertisers || {};
    advertisers.forEach(function(advertiser) {
      this.state.advertisers[advertiser.id] = advertiser;
    }, this);
    console.log('got new advertisers', advertisers);
    
    this.hasChanged();

  },

  getAdvertisers() {
    return this.fetch({
      id: 'GET_ADVERTISERS',
      locally() {
        return this.state.advertisers || undefined;
      },
      remotely() {
        return advertiserApi.getAllAdvertisers();
      }
    });
  },

  getAdvertiser(id) {
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

  refreshAdvertisers() {
    advertiserApi.getAllAdvertisers();
  },

  createAdvertiser(advertiser, options) {
    if(typeof options.pending == 'function') options.pending();
    advertiserApi.createAdvertiser(advertiser)
      .then(function(res) {
        if(typeof options.success == 'function') options.success(res.body);
        return res;
      }.bind(advertiser))
  }

});

export default advertiserStore;
