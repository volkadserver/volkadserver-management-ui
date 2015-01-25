/** @jsx React.DOM */

var React = require('react');

var Link = require('react-router').Link;
var RouteHandler = require('react-router').RouteHandler;

module.exports =  React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="trafficking" className="navbar-brand">Trafficking</Link>
            </div>

            <Link className="btn btn-primary navbar-btn pull-right" to="create-order">
              <span className="glyphicon glyphicon glyphicon-plus"></span> Create Order
            </Link>
          </div>
        </nav>
        <div className="container-fluid">
          <RouteHandler />
        </div>
      </div>
    )
  }
}); 
