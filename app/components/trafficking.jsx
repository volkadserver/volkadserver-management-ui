import React from "react";
import {Link} from "react-router";
import {RouteHandler} from "react-router";

export default React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="trafficking" className="navbar-brand">Trafficking</Link>
            </div>

            <span className="pull-right">
              <Link className="btn btn-primary navbar-btn btn-sm" to="create-advertiser">
                <span className="glyphicon glyphicon glyphicon-plus"></span> Advertiser
              </Link>
              <Link className="btn btn-primary navbar-btn btn-sm" to="create-order">
                <span className="glyphicon glyphicon glyphicon-plus"></span> Order
              </Link>
            </span>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <Link className="btn btn-link pull-right" to="order-index">
              Orders
            </Link>
            <Link className="btn btn-link pull-right" to="advertiser-index">
              Advertisers
            </Link>
          </div>
          <RouteHandler />
        </div>
      </div>
    )
  }
}); 
