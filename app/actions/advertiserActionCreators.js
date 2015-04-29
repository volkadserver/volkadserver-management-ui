import Marty from "marty";
import AdvertiserConstants from "../constants/advertiserConstants.js";
import AdvertiserApi from "../sources/advertiserApi";

class AdvertiserActionCreators extends Marty.ActionCreators {
  createAdvertiser(advertiser) {
    this.dispatch(AdvertiserConstants.CREATE_ADVERTISER, advertiser);
    return AdvertiserApi.createAdvertiser(advertiser)
  } 

  refreshAdvertisers() {
    this.dispatch(AdvertiserConstants.REFRESH_ADVERTISERS);
  }
}

export default Marty.register(AdvertiserActionCreators);

