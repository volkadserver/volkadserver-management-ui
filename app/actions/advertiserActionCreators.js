import Marty from "marty";
import AdvertiserConstants from "../constants/advertiserConstants.js";

class AdvertiserActionCreators extends Marty.ActionCreators {
  createAdvertiser(advertiser, options) {
    this.dispatch(AdvertiserConstants.CREATE_ADVERTISER, advertiser, options);
  } 

  refreshAdvertisers() {
    this.dispatch(AdvertiserConstants.REFRESH_ADVERTISERS);
  }
}

export default Marty.register(AdvertiserActionCreators);

