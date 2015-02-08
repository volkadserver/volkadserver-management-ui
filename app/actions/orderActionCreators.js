var marty = require('marty')
var orderConstants = require('../constants/orderConstants.js');

var timeout;

var orderActionCreators = marty.createActionCreators({
  createOrder: orderConstants.CREATE_ORDER(function(order, options) {
    this.dispatch(order, options);
    console.log('action creator this', this);
  }),

  refreshOrders: orderConstants.REFRESH_ORDERS(function() {
    this.dispatch();
    clearTimeout(timeout);
    timeout = setTimeout(this.refreshOrders, 10000);
  })
});


module.exports = orderActionCreators;
