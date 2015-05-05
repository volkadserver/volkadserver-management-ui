import Marty from "marty";
import OrderConstants from "../constants/orderConstants.js";

class OrderSourceActionCreators extends Marty.ActionCreators {
  receiveOrders(orders) {
    this.dispatch(OrderConstants.RECEIVE_ORDERS, orders);
    return orders;
  }

  receiveCreatives(creatives) {
    this.dispatch(OrderConstants.RECEIVE_CREATIVES, creatives);
    return creatives;
  }

  receiveFlights(flights) {
    this.dispatch(OrderConstants.RECEIVE_FLIGHTS, flights);
    return flights;
  }
}

export default Marty.register(OrderSourceActionCreators);
