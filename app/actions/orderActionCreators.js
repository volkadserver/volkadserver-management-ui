import Marty from "marty";
import OrderConstants from "../constants/orderConstants.js";

class OrderActionCreators extends Marty.ActionCreators {
  creatFlight(flight, orderId, options) {
    this.dispatch(OrderConstants.CREATE_FLIGHT, flight, orderId, options);
  }

  createCreative(creative, flightId, options) {
    this.dispatch(OrderConstants.CREATE_CREATIVE, creative, flightId, options);
  }

  createOrder(order, options) {
    this.dispatch(OrderConstants.CREATE_ORDER, order, options);
  }

  refreshOrders() {
    this.dispaych(OrderConstants.REFRESH_CREATIVES);
  }
}

export default Marty.register(OrderActionCreators);
