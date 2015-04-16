import marty from "marty";
import advertiserSourceActionCreators from "../actions/advertiserSourceActionCreators";

var advertiserApi = marty.createStateSource({
  type: 'http',
  baseUrl: 'http://localhost:3000/api',
  
  getAllAdvertisers() {
    return this.get('/Advertisers').then(function(res) {
      advertiserSourceActionCreators.receiveAdvertisers(res.body);
      return res.body;
    });
  },

  getAdvertiser(id) {
    return this.get('/Advertisers/' + id).then(function(res) {
      advertiserSourceActionCreators.receiveAdvertisers([res.body]);
    });
  },

  createAdvertiser(advertiser) {
    return this.post({ url: '/Advertisers', body: advertiser, contentType: 'application/json' })
      .then(function(res) {
        advertiserSourceActionCreators.receiveAdvertisers([res.body]);
        return res;
      });
  }
});


export default advertiserApi;
