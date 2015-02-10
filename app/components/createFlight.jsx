/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');

var orderActionCreators = require('../actions/orderActionCreators');
var orderStore = require('../stores/orderStore');
var CreateButton = require('./createButton.jsx');


module.exports = React.createClass({
  mixins: [ Router.State ],

  getInitialState: function() {
    return { name: '' };
  },

  submitFlight: function() {
    orderActionCreators.createFlight(
      this.state, 
      this.getParams().id,
      { 
        pending: function() { this.setState({ status: 'pending' }); }.bind(this),
        error: function(err) { 
          this.setState({ status: 'error' });
        }.bind(this),
        success: function() { 
          this.setState({ status: 'success', saved: true }); 
        }.bind(this)
      }
    );
  },

  onChange: function(val, e) {
    var change = {};
    change[val] = e.target.value;
    this.setState(change);
  },

  render: function() {
    return <div className="row">
        <form className="form-horizontal col-sm-12">
          <div className="row">
            <h3 className="col-sm-offset-2 col-sm-6">Add new flight</h3>
          </div>
          <div className="form-group">
            <label form="newFlightBasics" className="control-label col-sm-2">Name</label>
            <div className="col-sm-6">
              <input type="text" 
                className="form-control" id="newFlightName" 
                placeholder="New Flight Name" 
                value={this.state.name} 
                onChange={this.onChange.bind(this, 'name')} />
            </div>
            <p className="col-sm-4">
              This is some tip that helps with the stuff. I don't know how long it'll be really. We'll see.
            </p>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2">Start</label>
            <div className="col-sm-3">
              <input type="date"
                className="form-control"
                value={this.state.startDate} 
                onChange={this.onChange.bind(this, 'startDate')} />
            </div>
            <div className="col-sm-3">
              <input type="time"
                className="form-control"
                value={this.state.startTime} 
                onChange={this.onChange.bind(this, 'startTime')} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2">End</label>
            <div className="col-sm-3">
              <input type="date"
                className="form-control"
                value={this.state.endDate} 
                onChange={this.onChange.bind(this, 'endDate')} />
            </div>
            <div className="col-sm-3">
              <input type="time"
                className="form-control"
                value={this.state.endTime} 
                onChange={this.onChange.bind(this, 'endTime')} />
            </div>
          </div>
          <div className="form-group">
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-6">
              <div className="btn-group">
                <CreateButton 
                  onSubmit={this.submitFlight} 
                  status={this.state.status} />
              </div>
            </div>
          </div>
        </form>
      </div>
  }
});
