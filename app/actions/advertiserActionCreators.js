import marty from "marty";
import advertiserConstants from "../constants/advertiserConstants.js";

var timeout;

var advertiserActionCreators = marty.createActionCreators({
  createAdvertiser: advertiserConstants.CREATE_ADVERTISER(function(advertiser, options) {
    this.dispatch(advertiser, options);
  }),

  refreshAdvertisers: advertiserConstants.REFRESH_ADVERTISERS(function() {
    this.dispatch();
    clearTimeout(timeout);
    timeout = setTimeout(this.refreshAdvertisers, 10000);
  })
});


export default advertiserActionCreators;
