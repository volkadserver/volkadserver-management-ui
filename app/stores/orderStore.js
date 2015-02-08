var marty = require('marty');

var orderConstants = require('../constants/orderConstants');
var orderApi = require('../sources/orderApi');

var orderStore = marty.createStore({

  handlers: {
    receiveOrders: orderConstants.RECEIVE_ORDERS,
    createOrder: orderConstants.CREATE_ORDER
  },

  getInitialState: function() {
    return {};
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

  getAllOrders: function() {
    return this.fetch({
      id: 'GET_ALL_ORDERS',
      locally: function() { 
        if(this.hasAlreadyFetched('GET_ALL_ORDERS'))
          return this.state.orders;
      },
      remotely: function() {
        return orderApi.getAllOrders();
      }
    });
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
