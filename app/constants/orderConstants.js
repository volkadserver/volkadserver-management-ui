import marty from "marty";

var orderConstants = marty.createConstants([
  "REFRESH_ORDERS",
  "RECEIVE_ORDERS",
  "RECEIVE_CREATIVES",
  "RECEIVE_FLIGHTS",
  "CREATE_ORDER",
  "CREATE_FLIGHT",
  "CREATE_CREATIVE"
]);

export default orderConstants;
