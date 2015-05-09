import chai from 'chai';
import OrderApi from '../../app/sources/orderApi.js';
import chaiPromises from 'chai-as-promised';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';

chai.should();
//chai.config.truncateThreshold = 0;
chai.use(chaiProperties);
chai.use(chaiThings);
chai.use(chaiPromises);

describe('Order and Flight HTTP Source', () => {

  let order = { orderName: 'what a great order name' },
      flight = { flightName: 'what a great flight name' };

  it("should create a new order with an ID", 
    (done) => OrderApi.createOrder(order).should.eventually
      .include.a.thing.with.property('id')
      .and.notify(done));

  it("should create a new order with the correct order name", 
    (done) => OrderApi.createOrder(order).should.eventually
      .include.a.thing.with.property('orderName', order.orderName)
      .and.notify(done));

  it("should create a new flight with an associated order",
    (done) => OrderApi.createFlight(flight, 1).should.eventually
      .all.have.properties(flight).and
      .all.have.property('id').and
      .notify(done));

  it("should retreive a list of flights",
    (done) => OrderApi.getAllFlights().should.eventually
      .all.have.property('id').and
      .notify(done));

  it("should retreive a list of orders", 
    (done) => OrderApi.getAllOrders().should.eventually
      .all.have.property('id').and
      .notify(done));

  it("should retreive a single order by id", 
    (done) => OrderApi.getOrder(1).should.eventually
      .have.length(1).and
      .all.have.property('id', 1)
      .and.notify(done));

});
