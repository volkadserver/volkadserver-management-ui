import marty from "marty";
import orderConstants from "../constants/orderConstants.js";

var timeout;

var orderActionCreators = marty.createActionCreators({
  createFlight: orderConstants.CREATE_FLIGHT(function(flight, orderId, options) {
    this.dispatch(flight, orderId, options);
  }),

  createCreative: orderConstants.CREATE_CREATIVE(function(creative, orderId, options) {
    this.dispatch(creative, orderId, options);
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


export default orderActionCreators;
