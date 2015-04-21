import React from "react";
import NavBar from "./navBar.jsx";
import {RouteHandler} from "react-router";

export default React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return <div className="container">
        <NavBar />
        <RouteHandler {...this.props} />
        

      </div>
  }
});
