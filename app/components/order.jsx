/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render: function() {
    return <div className="row">
      <div className="page-header">
        <h1>Order 15 <small>Its details and flights should be below</small></h1>
      </div>
      <Link to="create-flight" className="btn btn-info">
        <span className="glyphicon glyphicon-plus"></span> Flights
      </Link>
    </div>
  }
});
