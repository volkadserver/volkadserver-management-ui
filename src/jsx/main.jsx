/** @jsx React.DOM */

var React = require('react');

var NavBar = require('./navBar.jsx');
var CampaignsPage = require('./campaigns.jsx');

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
    <Route name="campaigns" handler={CampaignsPage.master}>
      <DefaultRoute handler={CampaignsPage.index} />
      <Route name="create-campaign" path="create" handler={CampaignsPage.create} />
      <Route name="campaign" path="15" handler={CampaignsPage.campaign} />
    </Route>
    <Route name="reporting" handler={Reporting} />
    <Route name="inventory" handler={Inventory} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});

