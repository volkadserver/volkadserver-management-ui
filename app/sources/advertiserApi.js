import Marty from "marty";
import AdvertiserSourceActionCreators from "../actions/advertiserSourceActionCreators";

class AdvertiserApi extends Marty.HttpStateSource {
  constructor() {
    super();

    this.baseUrl = 'http://localhost:3000/api';
  }

  getAllAdvertisers() {
    return this.get('/Advertisers')
      .then((res) => AdvertiserSourceActionCreators.receiveAdvertisers(res.body));
  }

  getAdvertiser(id) {
    return this.get('/Advertisers/' + id)
      .then((res) => AdvertiserSourceActionCreators.receiveAdvertisers(res.body));
  }

  createAdvertiser(advertiser) {
    return this
      .post({ url: '/Advertisers', body: advertiser, contentType: 'application/json' })
      .then((res) => AdvertiserSourceActionCreators([res.body]));
  }
}

export default Marty.register(AdvertiserApi);
