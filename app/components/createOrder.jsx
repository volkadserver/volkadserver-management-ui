import React from "react/addons";
import _ from "lodash";
import OrderForm from "./orderForm.jsx";
import orderActionCreators from "../actions/orderActionCreators";
import orderStore from "../stores/orderStore";
import CreateFlight from "./createFlight.jsx";

export default React.createClass({
  getInitialState: function() {
    return {
      status: 'waiting',
      order: {}
    }
  },

  handleSubmit: function() {
    console.log(this.state.order);
    orderActionCreators.createOrder(
      this.state.order, 
      {
        pending: function() { this.setState({ status: 'pending' }); }.bind(this),
        error: function() { this.setState({ status: 'error' }); }.bind(this),
        success: function(order) { 
          this.replaceState({
            order: order,
            status: 'success'
          })
        }.bind(this)
      }
    );
  },

  handleChange: function(order) {
    order = React.addons.update(this.state.order, { $merge: order });
    this.setState({ order: order });
  },

  addFlight: function() {
    this.setState({ showFlightForm: true });
  },

  onSaveFlight: function(flight) {
    this.setState({ showFlightForm: false });
  },

  render: function() {
    var flightForm, addFlights;

    if(this.state.status == 'success') {
      addFlights = (
        <button type="button" className="btn btn-info" onClick={this.addFlight}>
          <span className="glyphicon glyphicon-plus"></span> Flights
        </button>
      );
    }

    if(this.state.showFlightForm) {
      flightForm = <CreateFlight onSaveSuccess={this.onSaveFlight} orderId={this.state.order.id} />
    }

    return <div className="row">
        <OrderForm order={this.state.order} buttonGroup={[ addFlights ]} onChange={this.handleChange} onSubmit={this.handleSubmit} />
        {flightForm}
      </div>
  }
});
