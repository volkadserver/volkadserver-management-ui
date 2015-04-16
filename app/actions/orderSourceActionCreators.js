import marty from "marty";
import orderConstants from "../constants/orderConstants.js";

var orderSourceActionCreators = marty.createActionCreators({
  receiveOrders: orderConstants.RECEIVE_ORDERS(function(orders) {
    this.dispatch(orders);
  }),

  receiveCreatives: orderConstants.RECEIVE_CREATIVES(function(creatives) {
    this.dispatch(creatives);
  }),

  receiveFlights: orderConstants.RECEIVE_FLIGHTS(function(flights, orderId) {
    this.dispatch(flights, orderId);
  })
});

export default orderSourceActionCreators;
