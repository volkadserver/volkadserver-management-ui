/** @jsx React.DOM */

var React = require('react');

var Link = require('react-router').Link;
var RouteHandler = require('react-router').RouteHandler;

module.exports = {
  master: React.createClass({
    render: function() {
      return (
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="campaigns" className="navbar-brand">Campaigns</Link>
              </div>

              <Link className="btn btn-primary navbar-btn pull-right" to="create-campaign">
                <span className="glyphicon glyphicon glyphicon-plus"></span> Create Campaign
              </Link>
            </div>
          </nav>
          <div className="container-fluid">
            <RouteHandler />
          </div>
        </div>
      )
    }
  }),

  index: React.createClass({
    render: function() {
      var IndexItem = module.exports.indexItem;
      return <div className="row">
          <table className="table table-hover table-condensed">
            <thead>
              <th>Remaining Flights</th>
              <th>Status</th>
              <th>Name</th>
              <th></th>
            </thead>
            <tbody>
              <IndexItem />
              <IndexItem />
              <IndexItem />
              <IndexItem />
              <IndexItem />
            </tbody>
          </table>
        </div>
    }
  }),

  indexItem: React.createClass({
    render: function() {
      return <tr>
          <td>4</td>
          <td><strong>Active</strong></td>
          <td>[N]_Tribal Fusion_5.0</td>
          <td>
            <span className="glyphicon glyphicon-edit pull-right"></span>
          </td>
        </tr>  
    }
  }),

  create: React.createClass({
   render: function() {
     return <div className="col-md-12">Create new campaigns here</div>
   }
  }),


};

