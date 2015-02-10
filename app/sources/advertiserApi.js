var marty = require('marty');
var advertiserSourceActionCreators = require('../actions/advertiserSourceActionCreators');

var advertiserApi = marty.createStateSource({
  type: 'http',
  baseUrl: 'http://localhost:3000/api',
  
  getAllAdvertisers: function() {
    return this.get('/Advertisers').then(function(res) {
      advertiserSourceActionCreators.receiveAdvertisers(res.body);
      return res.body;
    });
  },

  getAdvertiser: function(id) {
    return this.get('/Advertisers/' + id).then(function(res) {
      advertiserSourceActionCreators.receiveAdvertisers([res.body]);
    });
  },

  createAdvertiser: function(advertiser) {
    return this.post({ url: '/Advertisers', body: advertiser, contentType: 'application/json' })
      .then(function(res) {
        advertiserSourceActionCreators.receiveAdvertisers([res.body]);
        return res;
      });
  }
});


module.exports = advertiserApi;
