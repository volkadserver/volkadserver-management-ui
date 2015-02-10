var marty = require('marty')
var orderConstants = require('../constants/orderConstants.js');

var timeout;

var orderActionCreators = marty.createActionCreators({
  createFlight: orderConstants.CREATE_FLIGHT(function(flight, orderId, options) {
    this.dispatch(flight, orderId, options);
  }),

  createOrder: orderConstants.CREATE_ORDER(function(order, options) {
    this.dispatch(order, options);
  }),

  refreshOrders: orderConstants.REFRESH_ORDERS(function() {
    this.dispatch();
    clearTimeout(timeout);
    timeout = setTimeout(this.refreshOrders, 10000);
  })
});


module.exports = orderActionCreators;
