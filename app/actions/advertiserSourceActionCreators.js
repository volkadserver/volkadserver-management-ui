import Marty from "marty";
import AdvertiserConstants from "../constants/advertiserConstants.js";

class AdvertiserSourceActionCreators extends Marty.ActionCreators {
  receiveAdvertisers(advertisers) {
    this.dispatch(AdvertiserConstants.RECEIVE_ADVERTISERS, advertisers);
  }
}

export default Marty.register(AdvertiserSourceActionCreators);
