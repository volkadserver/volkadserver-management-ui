/** @jsx React.DOM */

var React = require('react');
var apiClient = require('../js/apiClient.js').initialize();

var NavBar = require('./navBar.jsx');
var trafficking = require('./trafficking.jsx');

var Router = require('react-router');
var Route = require('react-router').Route;
var DefaultRoute = require('react-router').DefaultRoute;
var RouteHandler = require('react-router').RouteHandler;


window.React = React; 

var App = React.createClass({
  getInitialState: function() {
    var state = {
      apiReady: false
    }
    if(!apiClient.ready) {
      apiClient.once('ready', (function() {
        console.log(' api ready');
        this.setState({ apiReady: true });
      }).bind(this));
    }
    return state;
  },

  render: function() {
    // TODO: add api error component when false
    var content = this.state.apiReady ? <RouteHandler /> : 'API not ready';
    return <div className="container">
        <NavBar />
        {content}
        

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
      <Route name="order" path=":id" handler={trafficking.order} />
      <Route name="create-flight" path="15/create" handler={trafficking.createFlight} />
    </Route>
    <Route name="reporting" handler={Reporting} />
    <Route name="inventory" handler={Inventory} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});

