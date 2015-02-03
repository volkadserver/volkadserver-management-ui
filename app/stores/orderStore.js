var marty = require('marty');

var orderConstants = require('../constants/orderConstants');
var orderApi = require('../sources/orderApi');

var orderStore = marty.createStore({

  handlers: {
    receiveOrders: orderConstants.RECEIVE_ORDERS,
    createOrder: orderConstants.CREATE_ORDER
  },

  getInitialState: function() {
    return {  };
  },

  receiveOrders: function(orders) {
    this.state.orders = this.state.orders || {};
    orders.forEach(function(order) {
      this.state.orders[order.id] = order;
    }, this);
    this.hasChanged()
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
    console.log('getting all orders');
    return this.fetch({
      id: 'GET_ALL_ORDERS',
      locally: function() { 
        return this.state.orders;
      },
      remotely: function() {
        return orderApi.getAllOrders();
      }
    });
  },

  createOrder: function(order) {
    var newOrder = order;
    newOrder.submission = this.fetch({
      id: 'CREATE_ORDER',
      locally: function() { return undefined; },
      remotely: function() {
        return orderApi.createOrder(order);
      }
    });

    this.state.newOrder = newOrder;
    this.hasChanged();
    return this.state.newOrder.submission;
  }
});

module.exports = orderStore;
