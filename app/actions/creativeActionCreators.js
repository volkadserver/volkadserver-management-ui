import marty from "marty";
import creativeConstants from "../constants/creativeConstants.js";

var timeout;

var creativeActionCreators = marty.createActionCreators({
  createCreative: creativeConstants.CREATE_CREATIVE(function(creative, options) {
    this.dispatch(creative, options);
  }),

  refreshCreatives: creativeConstants.REFRESH_CREATIVES(function() {
    this.dispatch();
    clearTimeout(timeout);
    timeout = setTimeout(this.refreshCreatives, 10000);
  })
});


export default creativeActionCreators;
