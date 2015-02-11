var marty = require('marty');
var _ = require('lodash');

var orderConstants = require('../constants/orderConstants');
var orderApi = require('../sources/orderApi');
var orderActionCreators = require('../actions/orderActionCreators');

var orderStore = marty.createStore({

  handlers: {
    receiveOrders: orderConstants.RECEIVE_ORDERS,
    receiveFlights: orderConstants.RECEIVE_FLIGHTS,
    createOrder: orderConstants.CREATE_ORDER,
    createFlight: orderConstants.CREATE_FLIGHT,
    refreshOrders: orderConstants.REFRESH_ORDERS
  },

  getInitialState: function() {
    orderActionCreators.refreshOrders();
    
    return { orders: {} };
  },

  receiveOrders: function(orders) {
    this.state.orders = this.state.orders || {};
    this.setState({ orders: _.merge(this.state.orders, _.indexBy(orders, 'id')) });
  },

  receiveFlights: function(flights) {
    this.state.orders = this.state.orders || {};
    flights = _.groupBy(flights, 'orderID');
    var orders = {};
    _.forEach(flights, function(orderFlights, orderId) {
      orders[orderId] = { flights: _.indexBy(orderFlights, 'id') };
    });

    this.setState({ orders: _.merge(this.state.orders, orders) });
  },

  getOrder: function(id) {
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

  getFlight: function(orderId, id) {
    return this.fetch({
      id: 'GET_FLIGHT',
      locally: function() {
        if(this.state.orders) {
          var a = this.state.orders[orderId] 
            ? this.state.orders[orderId].flights[id] : undefined;
          return a;
        }
      },
      remotely: function() {
        return orderApi.getFlight(orderId, id);
      }
    });
  },

  refreshOrders: function() {
    orderApi.getAllFlights();
    orderApi.getAllOrders();
  },

  createOrder: function(order, options) {
    if(typeof options.pending == 'function') options.pending();
    orderApi.createOrder(order)
      .then(function(res) {
        if(typeof options.success == 'function') options.success(res.body);
        return res;
      }.bind(order))
      .catch(function(er) {
        if(typeof options.error == 'function') options.error();
        return res;
      });
  },

  createFlight: function(flight, orderId, options) {
    if(typeof options.pending == 'function') options.pending();
    orderApi.createFlight(flight, orderId)
      .then(function(res) {
        if(typeof options.success == 'function') options.success();
        return res;
      }.bind(flight))
      .catch(function(er) {
        if(typeof options.error == 'function') options.error();
        return res;
      });
  }
});

module.exports = orderStore;
