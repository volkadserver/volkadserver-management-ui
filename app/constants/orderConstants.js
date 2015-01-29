var marty = require('marty');

var orderConstants = marty.createConstants([
  "GET_ALL_ORDERS",
  "RECEIVE_ORDERS"
]);

module.exports = orderConstants;
