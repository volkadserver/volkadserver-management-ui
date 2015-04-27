import Marty from "marty";
import CreativeConstants from "../constants/creativeConstants.js";

class CreativeActionCreators extends Marty.ActionCreators {
  createCreative(creative, options) {
    this.dispatch(CreativeConstants.CREATIVE_CREATIVE, creative, options);
  }

  refreshCreatives() {
    this.dispatch(CreativeConstants.CREATIVE_CREATIVE);
  }
}

export default Marty.register(CreativeActionCreators);
