var marty = require('marty');

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
    orders.forEach(function(order) {
      this.state.orders[order.id] = order;
    }, this);
    
    this.hasChanged();

  },

  receiveFlights: function(flights, orderId) {
    this.state.orders[orderId] = this.state.orders[orderId] || {};
    flights.forEach(function(flight) {
      this.state.orders[orderId][flight.id] = flight;
    }, this);
    
    this.hasChanged();

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

  refreshOrders: function() {
    orderApi.getAllOrders();
  },

  createOrder: function(order, options) {
    if(typeof options.pending == 'function') options.pending();
    orderApi.createOrder(order)
      .then(function(res) {
        if(typeof options.success == 'function') options.success();
      }.bind(order))
      .catch(function(er) {
        if(typeof options.error == 'function') options.error();
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
