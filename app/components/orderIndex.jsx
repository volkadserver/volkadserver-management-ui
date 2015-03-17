/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');
var Link = require('react-router').Link;
var marty = require('marty');
var orderStore = require('../stores/orderStore.js');

var orderStateMixin = marty.createStateMixin(orderStore);

var IndexItem = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td><strong>Active</strong></td>
        <td><Link to="order" params={this.props}>{this.props.orderName}</Link></td>
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
    var indexItems =  _.map(this.state.orders, function(order, i) {
          if(typeof order.id !== 'undefined')
            return <IndexItem {...order} key={i} />;
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
