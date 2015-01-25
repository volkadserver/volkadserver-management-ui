/** @jsx React.DOM */

var React = require('react');
var apiClient = require('./apiClient.js').initialize();
var routes = require('./routes.jsx');
var Router = require('react-router');

console.log(routes);

window.React = React; 

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});

