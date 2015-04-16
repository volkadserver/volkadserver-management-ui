import marty from "marty";
import creativeConstants from "../constants/creativeConstants.js";

var creativeSourceActionCreators = marty.createActionCreators({
  receiveCreatives: creativeConstants.RECEIVE_CREATIVES(function(creatives) {
    this.dispatch(creatives);
  })
});

export default creativeSourceActionCreators;
