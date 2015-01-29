var marty = require('marty');
var orderSourceActionCreators = require('../actions/orderSourceActionCreators');

var orderApi = marty.createStateSource({
  type: 'http',
  baseUrl: 'http://localhost:3000/api',
  getAllOrders: function() {
    return this.get('/Orders').then(function(res) {
      orderSourceActionCreators.receiveOrders(res.body);
    });
  }
});


module.exports = orderApi;
