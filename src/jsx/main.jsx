/** @jsx React.DOM */

var React = require('react');

var NavBar = require('./navBar.jsx');
var Router = require('react-router');

var Route = require('react-router').Route;
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

var Campaigns = React.createClass({
  render: function() {
    return <h1>Campaigns Page</h1>
  }
});

var Reporting = React.createClass({
  render: function() {
    return <h1>Reporting Page</h1>
  }
});

var routes = (
  <Route handler={App}>
    <Route name="campaigns" handler={Campaigns} />
    <Route name="reporting" handler={Reporting} />
    <Route name="inventory" handler={Inventory} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});

