import Marty from "marty";
import OrderConstants from "../constants/orderConstants.js";

class OrderSourceActionCreators extends Marty.ActionCreators {
  receiveOrders(orders) {
    this.dispatch(OrderConstants.RECEIVE_ORDERS, orders);
  }

  receiveCreatives(creatives) {
    this.dispatch(OrderConstants.RECEIVE_CREATIVES, creatives);
  }

  receiveFlights(flights) {
    this.dispatch(OrderConstants.RECEIVE_FLIGHTS, flights);
  }
}

export default Marty.register(OrderSourceActionCreators);
