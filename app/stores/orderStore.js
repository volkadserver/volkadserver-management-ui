var marty = require('marty');

var orderConstants = require('../constants/orderConstants');
var orderApi = require('../sources/orderApi');
var orderActionCreators = require('../actions/orderActionCreators');

var orderStore = marty.createStore({

  handlers: {
    receiveOrders: orderConstants.RECEIVE_ORDERS,
    createOrder: orderConstants.CREATE_ORDER,
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
  }
});

module.exports = orderStore;
