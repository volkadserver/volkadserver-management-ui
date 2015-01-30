var marty = require('marty');

var orderConstants = require('../constants/orderConstants');
var orderApi = require('../sources/orderApi');

var orderStore = marty.createStore({

  handlers: {
    receiveOrders: orderConstants.RECEIVE_ORDERS
  },

  getInitialState: function() {
    return {  };
  },

  receiveOrders: function(orders) {
    this.state.orders = this.state.orders || {};
    orders.forEach(function(order) {
      this.state.orders[order.id] = order;
    }, this);
    console.log(this.state);
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
  }


});

module.exports = orderStore;
