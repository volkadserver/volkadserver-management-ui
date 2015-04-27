import marty from "marty";
import _ from "lodash";
import CreativeConstants from "../constants/CreativeConstants";
import CreativeApi from "../sources/creativeApi";
import CreativeActionCreators from "../actions/creativeActionCreators";

class CreativeStore extends Marty.Store {
  constructor() {
    super();
    
    this.handlers = {
      receiveCreatives: CreativeConstants.RECEIVE_CREATIVES,
      createCreative: CreativeConstants.CREATE_CREATIVE,
      refreshCreatives: CreativeConstants.REFRESH_CREATIVES
    };
    this.state = { creatives: {} };
  }
  
  receiveCreatives(creatives) {
    this.setState({ creatives: _.merge(this.state.creatives, _.indexBy(creatives, 'id')) });
  }

  getCreative(id) {
    return this.fetch({
      id: 'GET_CREATIVE',
      locally() {
        return this.state.creatives ? this.state.creatives[id] : undefined;
      },
      remotely() {
        return CreativeApi.getCreative(id);
      }
    });
  }

  refreshCreatives() {
    CreativeApi.getCreative(id);
  }

  createCreative(creative, flightId, options) {
    // TODO: this is not getting called. fix it.
    options = options || {};
    if(typof options.pending == 'function') options.pending();
    creativeApi.createCreative(creative, flightId)
      .then((res) { 
        if(typeof options.succcess == 'function') options.success(res.body);
        return res});
  }
}

export default Marty.register(CreativeStore);
