/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;
var marty = require('marty');
var orderStore = require('../stores/orderStore.js');

var orderStateMixin = marty.createStateMixin({
  listenTo: orderStore,
  getState: function() {
    return {
      orders: orderStore.getAllOrders()
    };
  }
});

var IndexItem = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td><strong>Active</strong></td>
        <td><Link to="order" params={this.props}>{this.props.name}</Link></td>
        <td>
          <span className="glyphicon glyphicon-edit pull-right"></span>
        </td>
      </tr>  
    )
  }
});

module.exports = React.createClass({
  mixins: [ orderStateMixin ],

  render: function() {
    var indexItems = this.state.orders.when({
      pending: function() { return <tr><td><strong> Pending... </strong></td></tr> },
      failed: function(err) { 
        return <strong> {err}  </strong> 
      },
      done: function(orders) { 
        return orders.map(function(order, i) {
          return <IndexItem {...order} key={i} />;
        });
      }
    });

    return <div className="row">
        <table className="table table-hover table-condensed">
          <thead>
            <th>Remaining Flights</th>
            <th>Status</th>
            <th>Name</th>
            <th></th>
          </thead>
          <tbody>
            {indexItems}
          </tbody>
        </table>
      </div>
  }
});
