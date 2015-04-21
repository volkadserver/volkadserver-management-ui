import React from "react";
import marty from "marty";
import {Link} from "react-router";
import orderStore from "../stores/orderStore.js";
import FlightItem from "./flightItem.jsx";
import _ from "lodash";

var orderStateMixin = marty.createStateMixin({
  listenTo: orderStore,
  getState() {
    return orderStore.getOrder(this.props.id)
  }
});

export default React.createClass({
  mixins: [ orderStateMixin ],
  
  render: function() {
    return this.state.when({
      pending: function() { return <div className="row">Pending</div> },
      failed: function(err) { return <div className="row">{err}</div> },
      done: function(order) {
        var flightItems;

        if(order.flights) {
          flightItems =  _.map(order.flights, function(flight, i) {
            flight.orderId = order.id;
                return <FlightItem { ...flight } key={i} />;
              });
        }

        return <div className="row">
          <div className="page-header">
            <h1>{order.name} <small>Order {order.id}</small>
            <Link to="create-flight" params={{ id: order.id }} className="btn btn-info pull-right">
              <span className="glyphicon glyphicon-plus"></span> Flights
            </Link>
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
    });
  }
});
