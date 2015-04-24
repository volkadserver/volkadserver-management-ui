import marty from "marty";
import _ from "lodash";
import orderConstants from "../constants/orderConstants";
import orderApi from "../sources/orderApi";
import orderActionCreators from "../actions/orderActionCreators";

var orderStore = marty.createStore({

  handlers: {
    receiveOrders: orderConstants.RECEIVE_ORDERS,
    receiveFlights: orderConstants.RECEIVE_FLIGHTS,
    createOrder: orderConstants.CREATE_ORDER,
    createFlight: orderConstants.CREATE_FLIGHT,
    refreshOrders: orderConstants.REFRESH_ORDERS
  },

  getInitialState() {
    orderActionCreators.refreshOrders();
    
    return { };
  },

  receiveOrders(orders) {
    this.state.orders = this.state.orders || {};
    this.setState({ orders: _.merge(this.state.orders, _.indexBy(orders, 'id')) });
  },

  receiveFlights(flights) {
    this.state.orders = this.state.orders || {};
    flights = _.groupBy(flights, 'OrderId');
    var orders = {};
    _.forEach(flights, function(orderFlights, orderId) {
      orders[orderId] = { flights: _.indexBy(orderFlights, 'id') };
    });

    this.setState({ orders: _.merge(this.state.orders, orders) });
  },

  getOrders() {
    return this.fetch({
      id: 'GET_ORDERS',
      locally: function() {
        return this.state.orders;
      },
      remotely: function() {
        return orderApi.getAllOrders();
      }
    });
  },

  getOrder(id) {
    return this.fetch({
      id: 'GET_ORDER',
      locally: function() {
        return this.state.orders ? this.state.orders[id] : undefined;
      },
      remotely: function() {
        return orderApi.getOrder(id);
      }
    });
  },

  getFlight(orderId, id) {
    return this.fetch({
      id: 'GET_FLIGHT',
      locally: function() {
        if(this.state.orders) {
          return this.state.orders[orderId] 
            ? this.state.orders[orderId].flights[id] : undefined;
        }
      },
      remotely: function() {
        return orderApi.getFlight(orderId, id);
      }
    });
  },

  refreshOrders() {
    orderApi.getAllFlights();
    orderApi.getAllOrders();
  },

  createOrder(order, options) {
    if(typeof options.pending == 'function') options.pending();
    orderApi.createOrder(order)
      .then(function(res) {
        if(typeof options.success == 'function') options.success(res.body);
        return res;
      }.bind(order))
      .catch(function(err) {
        if(typeof options.error == 'function') options.error();
        return err;
      });
  },

  createFlight(flight, orderId, options) {
    if(typeof options.pending == 'function') options.pending();
    orderApi.createFlight(flight, orderId)
      .then(function(res) {
        if(typeof options.success == 'function') options.success(res.body);
        return res;
      }.bind(flight))
  }
});

export default orderStore;
