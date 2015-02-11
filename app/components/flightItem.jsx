/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({

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
