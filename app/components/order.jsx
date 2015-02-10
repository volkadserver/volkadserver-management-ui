/** @jsx React.DOM */

var React = require('react');
var marty = require('marty');
var Link = require('react-router').Link;
var orderStore = require('../stores/orderStore.js');
var routerState = require('react-router').State;

var orderStateMixin = marty.createStateMixin({
  listenTo: orderStore,
  getState: function() {
    return orderStore.getOrder(this.getParams().id)
  }
});

module.exports = React.createClass({
  mixins: [ routerState, orderStateMixin ],
  
  render: function() {
    return this.state.when({
      pending: function() { return <div className="row">Pending</div> },
      failed: function(err) { return <div className="row">{err}</div> },
      done: function(order) {
        return <div className="row">
          <div className="page-header">
            <h1>{order.name} <small>Order {order.id}</small></h1>
          </div>
          <Link to="create-flight" params={{ id: order.id }} className="btn btn-info">
            <span className="glyphicon glyphicon-plus"></span> Flights
          </Link>
        </div>
      }
    });
  }
});
