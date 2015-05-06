import Marty from "marty";
import OrderSourceActionCreators from "../actions/orderSourceActionCreators";

class OrderApi extends Marty.HttpStateSource {
  constructor() {
    super();

    this.baseUrl = 'http://localhost:3000/api';
  }

  getAllOrders() {
    let orderPromise = this.get('/Orders').then((res) => res.body )
    let flightPromise = this.getAllFlights();

    return Promise.all([orderPromise, flightPromise])
      .then(([orders, flights]) => {
        OrderSourceActionCreators.receiveOrders(orders);
        OrderSourceActionCreators.receiveFlights(flights);
        return orders;
      }).catch((err) => console.log(err));
  }

  getAllFlights() {
    return this.get('/Flights')
      .then((res) => OrderSourceActionCreators.receiveFlights(res.body));
  }

  getOrder(id) {
    return this.get('/Orders/' + id)
      .then((res) => OrderSourceActionCreators.receiveOrders([res.body]));
  }

  getFlight(orderId, id) {
    return this.get('/Orders/' + orderId + '/Flights/' + id)
      .then((res) => OrderSourceActionCreators.receiveFlights([res.body]));
  }

  createOrder(order) {
    return this.post({ url: '/Orders', body: order, contentType: 'application/json' })
      .then((res) => OrderSourceActionCreators.receiveOrders([res.body]));
  }

  createFlight(flight, orderId, options) {
    return this
      .post({ 
        url: '/Orders/' + orderId + '/Flights', 
        body: flight, 
        contentType: 'application/json' })
      .then((res) => OrderSourceActionCreators.receiveFlights([res.body], orderId));
  }
}

export default Marty.register(OrderApi);
