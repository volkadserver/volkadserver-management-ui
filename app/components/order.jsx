import React from "react";
import Marty from "marty";
import {Link} from "react-router";
import OrderStore from "../stores/orderStore.js";
import FlightItem from "./flightItem.jsx";
import _ from "lodash";

class Order extends React.Component {
  render() {
    let flightItems, createFlightLink,
        order = this.props.order;

    if(order.flights) {
      // TODO: create a flight index component which loads these
      flightItems =  _.map(order.flights, function(flight, i) {
        flight.orderId = flight.OrderId;
            return <FlightItem { ...flight } key={i} />;
          });
    }

    if(order.id)
      createFlightLink = (
        <Link to="create-flight" params={{ id: order.id }} className="btn btn-info pull-right">
          <span className="glyphicon glyphicon-plus"></span> Flights
        </Link>);



    return <div className="row">
      <div className="page-header">
        <h1>{order.name} <small>Order {order.id}</small>
        { createFlightLink }
      </h1>
      </div>
      <table className="table table-hover table-condensed">
        <thead>
          <th>Remaining Flights</th>
          <th>Status</th>
          <th>Name</th>
          <th></th>
        </thead>
        <tbody>
          {flightItems}
        </tbody>
      </table>
    </div>
  }
}

export default Marty.createContainer(Order, {
  listenTo: OrderStore,

  fetch: {
    order() {
      return OrderStore.for(this).getOrder(this.props.id);
    }
  },
  failed(err) {
    return <div>{err}</div>
  },
  pending() {
    return this.done({ order: {} });
  }
});
