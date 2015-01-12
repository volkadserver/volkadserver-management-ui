/** @jsx React.DOM */

var React = require('react');

var NavBar = require('./navBar.jsx');

window.React = React; 

var App = React.createClass({
  render: function() {
    return <div className="container">
        <NavBar />

      </div>
  }
});

React.render(<App name="lol!"/>, document.body);

