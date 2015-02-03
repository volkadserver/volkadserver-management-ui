var marty = require('marty');

var orderConstants = marty.createConstants([
  "GET_ALL_ORDERS",
  "RECEIVE_ORDERS",
  "CREATE_ORDER"
]);

module.exports = orderConstants;
