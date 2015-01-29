/** @jsx React.DOM */

var React = require('react');
var routes = require('./routes.jsx');
var Router = require('react-router');

window.React = React; 

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.body);
});

