import Marty from "marty";
import _ from "lodash";
import OrderConstants from "../constants/OrderConstants";
import OrderApi from "../sources/orderApi";
import OrderActionCreators from "../actions/orderActionCreators";

class OrderStore extends Marty.Store {
  constructor() {
    super();

    this.handlers = {
      receiveOrders: OrderConstants.RECEIVE_ORDERS,
      receiveFlights: OrderConstants.RECEIVE_FLIGHTS,
      createOrder: OrderConstants.CREATE_ORDER,
      createFlight: OrderConstants.CREATE_FLIGHT,
      refreshOrders: OrderConstants.REFRESH_ORDERS
    }
  }

  receiveOrders(orders) {
    this.setState({ orders : _.merge(this.state.orders || {}, _.indexBy(orders, 'id')) });
  }

  receiveFlights(flights) {
    let orders = _.reduce(
      _.groupBy(flights, 'OrderId'), 
      (memo, orderFlights, orderId) => { 
        memo[orderId] = { flights: _.indexBy(orderFlights, 'id') }
        return memo;
      }, {});


    this.setState({ orders: _.merge(this.state.orders || {}, orders) });
  }

  getOrders() {
    return this.fetch({
      id: 'GET_ORDERS',
      locally() {
        console.log(this.state.orders);
        return this.state.orders;
      },
      remotely() {
        return OrderApi.getAllOrders();
      }
    });
  }

  getOrder(id) {
    return this.fetch({
      id: 'GET_ORDER',
      locally() {
        return this.state.orders ? this.state.orders[id] : undefined;
      },
      remotely: function() {
        return OrderApi.getAllOrders();
      }
    });
  }

  getFlight(orderId, id) {
    return this.fetch({
      id: 'GET_FLIGHT',
      locally() {
        return (this.state.orders && this.state.orders[orderId])
          ? this.state.orders[orderId].flights[id] : undefined;
      },
      remotely() {
        return OrderApi.getAllOrders();
      }
    });
  }

  refreshOrders() {
    OrderApi.getAllFlights();
    OrderApi.getAllOrders();
  }

  createOrder(order, options) {
    if(typeof options.pending == 'function') options.pending();
    OrderApi.createOrder(order)
      .then((res) => {
        if(typeof options.success == 'function') options.success(res.body);
        return res;
      });
  }

  createFlight(flight, orderId, options) {
    if(typeof options.pending == 'function') options.pending();
    OrderApi.createFlight(flight, orderId)
      .then((res) => {
        if(typeof options.success == 'function') options.success(res.body);
        return res;
      });
  }

}

export default Marty.register(OrderStore);
