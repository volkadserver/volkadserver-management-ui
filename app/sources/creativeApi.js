var marty = require('marty');
var creativeSourceActionCreators = require('../actions/creativeSourceActionCreators');

var creativeApi = marty.createStateSource({
  type: 'http',
  baseUrl: 'http://localhost:3000/api',
  
  getAllCreatives: function() {
    return this.get('/Creatives').then(function(res) {
      creativeSourceActionCreators.receiveCreatives(res.body);
      return res.body;
    });
  },

  getCreative: function(id) {
    return this.get('/Creatives/' + id).then(function(res) {
      creativeSourceActionCreators.receiveCreatives([res.body]);
    });
  },

  createCreative: function(creative, flightId) {
    creative.flightId = flightId;
    return this.post({ url: '/Creatives', body: creative, contentType: 'application/json' })
      .then(function(res) {
        creativeSourceActionCreators.receiveCreatives([res.body]);
        return res;
      });
  }

});


module.exports = creativeApi;
