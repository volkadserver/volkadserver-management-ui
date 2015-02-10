var marty = require('marty');

var orderConstants = marty.createConstants([
  "REFRESH_ORDERS",
  "RECEIVE_ORDERS",
  "RECEIVE_FLIGHTS",
  "CREATE_ORDER",
  "CREATE_FLIGHT"
]);

module.exports = orderConstants;
