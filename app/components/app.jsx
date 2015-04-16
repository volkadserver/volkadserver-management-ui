var React = require('react');
var NavBar = require('./navBar.jsx');
var RouteHandler = require('react-router').RouteHandler;

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return <div className="container">
        <NavBar />
        <RouteHandler />
        

      </div>
  }
});
