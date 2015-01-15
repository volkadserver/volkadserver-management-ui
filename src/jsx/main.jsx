/** @jsx React.DOM */

var React = require('react');

var NavBar = require('./navBar.jsx');
var trafficking = require('./trafficking.jsx');

var Router = require('react-router');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var RouteHandler = require('react-router').RouteHandler;


window.React = React; 

var App = React.createClass({
  render: function() {
    return <div className="container">
        <NavBar />
        <RouteHandler />

      </div>
  }
});

var Inventory = React.createClass({
  render: function() {
    return <h1>Inventory Page</h1>
  }
});

var Reporting = React.createClass({
  render: function() {
    return <h1>Reporting Page</h1>
  }
});

var routes = (
  <Route handler={App}>
    <Route name="trafficking" handler={trafficking.master}>
      <DefaultRoute handler={trafficking.index} />
      <Route name="create-order" path="create" handler={trafficking.createOrder} />
      <Route name="order" path="15" handler={trafficking.order} />
      <Route name="create-flight" path="15/create" handler={trafficking.createFlight} />
    </Route>
    <Route name="reporting" handler={Reporting} />
    <Route name="inventory" handler={Inventory} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});

