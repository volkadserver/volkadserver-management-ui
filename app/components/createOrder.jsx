/** @jsx React.DOM */

var React = require('react');

var orderActionCreators = require('../actions/orderActionCreators');
var orderStore = require('../stores/orderStore');
var CreateButton = require('./createButton.jsx');
var CreateFlight = require('./createFlight.jsx');


module.exports = React.createClass({
  getInitialState: function() {
    return { name: '' };
  },

  submitOrder: function() {
    orderActionCreators.createOrder(
      this.state, 
      { 
        pending: function() { this.setState({ status: 'pending' }); }.bind(this),
        error: function() { this.setState({ status: 'error' }); }.bind(this),
        success: function(order) { 
          this.setState({ status: 'success', order: order }); 
        }.bind(this)
      }
    );
  },

  onChangeName: function(e) {
    this.setState({ name: e.target.value });
  },

  addFlight: function() {
    this.setState({ showFlightForm: true });
  },

  render: function() {
    var buttonClass, buttonGlyph, submitAction, buttonSuffix, addFlights, flightForm;

    if(this.state.status == 'success' && this.state.order) {
      addFlights = (
        <button type="button" className="btn btn-info" onClick={this.addFlight}>
          <span className="glyphicon glyphicon-plus"></span> Flights
        </button>
      );
    }

    if(this.state.showFlightForm) {
      flightForm = <CreateFlight orderId={this.state.order.id} />
    }

    return <div className="row">
        <form className="form-horizontal col-sm-12">
          <div className="row">
            <h3 className="col-sm-offset-2 col-sm-6">Add new order</h3>
          </div>
          <div className="form-group">
            <label form="newOrderBasics" className="control-label col-sm-2">Name</label>
            <div className="col-sm-6">
              <input type="text" 
                className="form-control" id="newOrderName" 
                placeholder="New Order Name" 
                value={this.state.name} onChange={this.onChangeName} />
            </div>
            <p className="col-sm-4">
              This is some tip that helps with the stuff. I don't know how long it'll be really. We'll see.
            </p>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-6">
              <div className="btn-group">
                <CreateButton 
                  onSubmit={this.submitOrder} 
                  status={this.state.status} />
                {addFlights}
              </div>
            </div>
          </div>
        </form>
        {flightForm}
      </div>
  }
});
