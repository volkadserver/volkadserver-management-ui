import React from "react";
import "babel/polyfill";
import NavBar from "./navBar.jsx";
import {RouteHandler} from "react-router";

class App extends React.Component {
  render() {
    return <div className="container">
        <NavBar />
        <RouteHandler {...this.props} />
      </div>
  }
}

export default App; 
