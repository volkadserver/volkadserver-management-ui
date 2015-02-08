var marty = require('marty')
var orderConstants = require('../constants/orderConstants.js');

var orderActionCreators = marty.createActionCreators({
  createOrder: orderConstants.CREATE_ORDER(function(order, options) {
    this.dispatch(order, options);
  })
});


module.exports = orderActionCreators;
