var marty = require('marty')
var orderConstants = require('../constants/orderConstants.js');
console.log(orderConstants);

var orderSourceActionCreators = marty.createActionCreators({
  receiveOrders: orderConstants.RECEIVE_ORDERS(function(users) {
    this.dispatch(users);
  })
});

module.exports = orderSourceActionCreators;
