var marty = require('marty');

var orderConstants = marty.createConstants([
  "REFRESH_ORDERS",
  "RECEIVE_ORDERS",
  "CREATE_ORDER"
]);

module.exports = orderConstants;
