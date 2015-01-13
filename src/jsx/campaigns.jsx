/** @jsx React.DOM */

var React = require('react');

var Link = require('react-router').Link;
var RouteHandler = require('react-router').RouteHandler;

module.exports = {
  master: React.createClass({
    render: function() {
      return (
        <div className="container">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="campaigns" className="navbar-brand">Campaigns</Link>
              </div>

              <Link className="btn btn-primary navbar-btn pull-right" to="create-campaign">
                <span className="glyphicon glyphicon glyphicon-plus"></span> Create Campaign
              </Link>
            </div>
          </nav>
          <div className="row">
            <RouteHandler />
          </div>
        </div>
      )
    }
  }),

  index: React.createClass({
    render: function() {
      return <div className="col-md-12">List campaigns here</div>
    }
  }),

  create: React.createClass({
   render: function() {
     return <div className="col-md-12">Create new campaigns here</div>
   }
  })

};

