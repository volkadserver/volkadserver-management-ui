/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('lodash');

var OrderForm = require('./orderForm.jsx');
var orderActionCreators = require('../actions/orderActionCreators');
var orderStore = require('../stores/orderStore');
var CreateFlight = require('./createFlight.jsx');

module.exports = React.createClass({
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
