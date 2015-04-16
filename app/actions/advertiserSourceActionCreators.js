import marty from "marty";
import advertiserConstants from "../constants/advertiserConstants.js";

var advertiserSourceActionCreators = marty.createActionCreators({
  receiveAdvertisers: advertiserConstants.RECEIVE_ADVERTISERS(function(advertisers) {
    this.dispatch(advertisers);
  })
});

export default advertiserSourceActionCreators;
