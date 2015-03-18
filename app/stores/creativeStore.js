var marty = require('marty');
var _ = require('lodash');

var creativeConstants = require('../constants/creativeConstants');
var creativeApi = require('../sources/creativeApi');
var creativeActionCreators = require('../actions/creativeActionCreators');

var creativeStore = marty.createStore({

  handlers: {
    receiveCreatives: creativeConstants.RECEIVE_CREATIVES,
    createCreative: creativeConstants.CREATE_CREATIVE,
    refreshCreatives: creativeConstants.REFRESH_CREATIVES
  },

  getInitialState: function() {
    creativeActionCreators.refreshCreatives();
    
    return { creatives: {} };
  },

  receiveCreatives: function(creatives) {
    this.state.creatives = this.state.creatives || {};
    this.setState({ creatives: _.merge(this.state.creatives, _.indexBy(creatives, 'id')) });
  },


  getCreative: function(id) {
    return this.fetch({
      id: 'GET_creative',
      locally: function() {
        return this.state.creatives ? this.state.creatives[id] : undefined;
      },
      remotely: function() {
        return creativeApi.getCreative(id);
      }
    });
  },

  refreshCreatives: function() {
    creativeApi.getAllCreatives();
  },

  createCreative: function(creative, flightId, options) {
    options = options || {};
    if(typeof options.pending == 'function') options.pending();
    creativeApi.createCreative(creative, flightId)
      .then(function(res) {
        if(typeof options.success == 'function') options.success(res.body);
        return res;
      }.bind(creative))
      .catch(function(err) {
        if(typeof options.error == 'function') options.error();
        return err;
      });
  },

});

module.exports = creativeStore;
