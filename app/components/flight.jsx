/** @jsx React.DOM */

var React = require('react');
var marty = require('marty');
var orderStore = require('../stores/orderStore.js');
var routerState = require('react-router').State;
var _ = require('lodash');

var orderStateMixin = marty.createStateMixin({
  listenTo: orderStore,
  getState: function() {
    return orderStore.getFlight(this.getParams().orderID, this.getParams().id)
  }
});

module.exports = React.createClass({
  mixins: [ routerState, orderStateMixin ],
  
  render: function() {

    return this.state.when({
      pending: function() { return <div className="row">Pending</div> },
      failed: function(err) { return <div className="row">{err}</div> },
      done: function(flight) {
        return <div className="row">
          <div className="page-header">
            <h1>{flight.name} <small>flight {flight.id}</small>
          </h1>
          </div>
        </div>
      }
    });
  }
});
