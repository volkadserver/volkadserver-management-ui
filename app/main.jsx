import React from "react";
import routes from "./routes.jsx";
import Router from "react-router";

window.React = React;

Router.run(routes, function(Handler, state) {
  React.render(<Handler {...state.params} />, document.body);
});

