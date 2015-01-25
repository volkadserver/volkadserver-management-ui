/** @jsx React.DOM */

var React = require('react');
var apiClient = require('../apiClient');
var Link = require('react-router').Link;

var IndexItem = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return <tr>
        <td>{this.props.id}</td>
        <td><strong>Active</strong></td>
        <td><Link to="order" params={this.props}>{this.props.name}</Link></td>
        <td>
          <span className="glyphicon glyphicon-edit pull-right"></span>
        </td>
      </tr>  
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    return {
      indexItems: []
    }
  },

  componentDidMount: function() {
    apiClient.Orders.find(function(data) { 
      this.setState({ indexItems: data.obj });
    }.bind(this));
  },

  render: function() {
    var indexItems = [];
    for(var i in this.state.indexItems) {
      indexItems.push(<IndexItem {...this.state.indexItems[i]} />);
    }

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
