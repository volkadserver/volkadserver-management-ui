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
    this.setState({ orders: orders });
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
