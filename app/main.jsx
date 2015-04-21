import React from "react";
import routes from "./routes.jsx";
import Router from "react-router";

window.React = React;

Router.run(routes, function(Handler) {
  React.render(<Handler {...this.props} />, document.body);
});

