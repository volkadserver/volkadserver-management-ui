import Marty from "marty";
import AdvertiserConstants from "../constants/advertiserConstants";
import AdvertiserApi from "../sources/advertiserApi";
import AdvertiserActionCreators from "../actions/advertiserActionCreators";

class AdvertiserStore extends Marty.Store {
  constructor() {
    super();

    AdvertiserActionCreators.refreshAdvertisers();

    this.state = { advertisers: {} };

    this.handlers = {
      receiveAdvertisers: AdvertiserConstants.RECEIVE_ADVERTISERS,
      createAdvertiser: AdvertiserConstants.CREATE_ADVERTISER,
      refreshAdvertisers: AdvertiserConstants.REFRESH_ADVERTISERS
    };
  }

  receiveAdvertisers(advertisers) {
    // TODO: why aren't you just using _.merge?
    advertisers.forEach(function(advertiser) {
      this.state.advertisers[advertiser.id] = advertiser;
    }, this);
    this.hasChanged();
  }

  getAdvertisers() {
    return this.fetch({
      id: 'GET_ADVERTISERS',
      locally() {
        return this.state.advertisers || undefined;
      },
      remotely() {
        return AdvertiserApi.getAllAdvertisers();
      }
    });
  }

  getAdvertiser(id) {
    return this.fetch({
      id: 'GET_ADVERTISER',
      locally() {
        return this.state.advertisers ? this.state.advertisers[id] :  undefined;
      },
      remotely() {
        return AdvertiserApi.getAllAdvertisers();
      }
    });
  }

  refreshAdvertisers() {
    AdvertiserApi.getAllAdvertisers();
  }

  createAdvertiser(advertiser, options) {
    if(typeof options.pending == 'function') options.pending();
    AdvertiserApi.createAdvertiser(advertiser)
      .then((res) => {
        if(typeof options.success == 'function') options.success(res.body);
        return res;
      });
  }
}

export default Marty.register(AdvertiserStore);
