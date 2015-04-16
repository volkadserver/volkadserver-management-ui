import marty from "marty";
import _ from "lodash";
import creativeConstants from "../constants/creativeConstants";
import creativeApi from "../sources/creativeApi";
import creativeActionCreators from "../actions/creativeActionCreators";

var creativeStore = marty.createStore({

  handlers: {
    receiveCreatives: creativeConstants.RECEIVE_CREATIVES,
    createCreative: creativeConstants.CREATE_CREATIVE,
    refreshCreatives: creativeConstants.REFRESH_CREATIVES
  },

  getInitialState() {
    creativeActionCreators.refreshCreatives();
    
    return { creatives: {} };
  },

  receiveCreatives(creatives) {
    this.state.creatives = this.state.creatives || {};
    this.setState({ creatives: _.merge(this.state.creatives, _.indexBy(creatives, 'id')) });
  },


  getCreative(id) {
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

  refreshCreatives() {
    creativeApi.getAllCreatives();
  },

  createCreative(creative, flightId, options) {
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

export default creativeStore;
