import Marty from "marty";
import _ from "lodash";
import AdvertiserConstants from "../constants/advertiserConstants";
import AdvertiserApi from "../sources/advertiserApi";
import AdvertiserActionCreators from "../actions/advertiserActionCreators";

class AdvertiserStore extends Marty.Store {
  constructor() {
    super();

    this.getAdvertisers();

    this.state = { advertisers: undefined };

    this.handlers = {
      receiveAdvertisers: AdvertiserConstants.RECEIVE_ADVERTISERS,
      createAdvertiser: AdvertiserConstants.CREATE_ADVERTISER
    };
  }

  receiveAdvertisers(advertisers) {
    advertisers = _.indexBy(advertisers, 'id');
    this.setState({ advertisers: Object.assign(this.state.advertisers || {}, advertisers) });
  }

  getAdvertisers() {
    return this.fetch({
      id: 'GET_ADVERTISERS',
      locally() {
        return this.state.advertisers;
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

  createAdvertiser(advertiser) {
    // In case you wanted to add a fake one or something while we wait for
    // receiveAdvertisers to get called.
  }
}

export default Marty.register(AdvertiserStore);
