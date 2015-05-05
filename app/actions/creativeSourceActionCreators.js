import Marty from "marty";
import CreativeConstants from "../constants/creativeConstants.js";

class CreativeSourceActionCreators extends Marty.ActionCreators {
  receiveCreatives(creatives) {
    this.dispatch(CreativeConstants.RECEIVE_CREATIVES, creatives);
    return creatives;
  }
}

export default Marty.register(CreativeSourceActionCreators);
