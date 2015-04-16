import marty from "marty";
import orderSourceActionCreators from "../actions/orderSourceActionCreators";

var orderApi = marty.createStateSource({
  type: 'http',
  baseUrl: 'http://localhost:3000/api',
  
  getAllOrders() {
    return this.get('/Orders').then(function(res) {
      orderSourceActionCreators.receiveOrders(res.body);
      return res.body;
    });
  },

  getAllFlights() {
    return this.get('/Flights').then(function(res) {
      orderSourceActionCreators.receiveFlights(res.body);
      return res.body;
    });
  },

  getOrder(id) {
    return this.get('/Orders/' + id).then(function(res) {
      orderSourceActionCreators.receiveOrders([res.body]);
    });
  },

  getFlight(orderId, id) {
    return this.get('/Flights/' + id).then(function(res) {
      orderSourceActionCreators.receiveFlights([res.body]);
      return res.body
    });
  },

  createOrder(order) {
    return this.post({ url: '/Orders', body: order, contentType: 'application/json' })
      .then(function(res) {
        orderSourceActionCreators.receiveOrders([res.body]);
        return res;
      });
  },

  createFlight(flight, orderId, options) {
    return this.post({ url: '/Orders/'+orderId+'/flights', body: flight, contentType: 'application/json' })
      .then(function(res) {
        orderSourceActionCreators.receiveFlights([res.body], orderId);
        return res;
      })
  }
});


export default orderApi;
