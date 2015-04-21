import React from "react";
import marty from "marty";
import orderStore from "../stores/orderStore.js";
import {Link} from "react-router";
import CreateCreative from "./createCreative.jsx";
import _ from "lodash";

var orderStateMixin = marty.createStateMixin({
  listenTo: orderStore,
  getState() {
    return orderStore.getFlight(this.props.orderId, this.props.id)
  }
});

export default React.createClass({
  mixins: [ orderStateMixin ],
  
  render: function() {

    return this.state.when({
      pending: function() { return <div className="row">Pending</div> },
      failed: function(err) { return <div className="row">{err}</div> },
      done: function(flight) {
        return <div className="row">
          <div className="page-header">
            <h1>
              {flight.flightName + ' '}
              <small>
                <Link params={{ id: flight.orderId }} to="order">
                  belongs to Order #{flight.orderId}
                </Link>
              </small>
            </h1>
          </div>
          <div>
            <CreateCreative />
          </div>
        </div>
      }
    });
  }
});
