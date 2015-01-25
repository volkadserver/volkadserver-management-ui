/** @jsx React.DOM */

var React = require('react');
var NavBar = require('./navBar.jsx');
var RouteHandler = require('react-router').RouteHandler;
var apiClient = require('../apiClient').initialize();

module.exports = React.createClass({
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
