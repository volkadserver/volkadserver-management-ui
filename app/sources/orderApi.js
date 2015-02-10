var marty = require('marty');
var orderSourceActionCreators = require('../actions/orderSourceActionCreators');

var orderApi = marty.createStateSource({
  type: 'http',
  baseUrl: 'http://localhost:3000/api',
  
  getAllOrders: function() {
    return this.get('/Orders').then(function(res) {
      orderSourceActionCreators.receiveOrders(res.body);
      return res.body;
    });
  },

  getOrder: function(id) {
    return this.get('/Orders/' + id).then(function(res) {
      orderSourceActionCreators.receiveOrders([res.body]);
    });
  },

  createOrder: function(order) {
    return this.post({ url: '/Orders', body: order, contentType: 'application/json' })
      .then(function(res) {
        orderSourceActionCreators.receiveOrders([res.body]);
        return res;
      });
  },

  createFlight: function(flight, orderId, options) {
    return this.post({ url: '/Orders/'+orderId+'/flights', body: flight, contentType: 'application/json' })
      .then(function(res) {
        orderSourceActionCreators.receiveFlights([res.body], orderId);
        return res;
      })
  }
});


module.exports = orderApi;
