import React from "react";
import Marty from "marty";
import OrderStore from "../stores/orderStore.js";
import {Link} from "react-router";
import CreateCreative from "./createCreative.jsx";

class Flight extends React.Component {
  render() {
    return <div className="row">
      <div className="page-header">
        <h1>
          {this.props.flight.flightName + ' '}
          <small>
            <Link params={{ id: this.props.orderId }} to="order">
              belongs to Order #{this.props.flight.orderId}
            </Link>
          </small>
        </h1>
      </div>
      <div>
        <CreateCreative />
      </div>
    </div>
  }
}

export default Marty.createContainer(Flight, {
  listenTo: OrderStore,
  fetch: {
    flight() {
      return OrderStore.for(this).getFlight(this.props.orderId, this.props.id);
    }
  },
  failed(err) {
    return <div>{err}</div>
  },
  pending() {
    return this.done({
      flight: { }
    });
  }
});

