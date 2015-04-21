import React from "react";
import {Link} from "react-router";


var NavLi = React.createClass({
  render() {
    // TODO: fix navbar active flag
    //var isActive = this.isActive(this.props.to, this.props.params, this.props.query);
    var isActive = true;
    var className = isActive ? 'active' : '';
    var link = (
      <Link {...this.props} />
    );

    return <li className={className}>{link}</li>;
  }
});

export default React.createClass({
  render: function() {
    return <nav className="navbar navbar-default navbar-fixed-bottom">
        <div className="container">
          <div className="navbar-header">
            <button 
              type="button" 
              className="navbar-toggle collapsed" 
              data-toggle="collapse" data-target="#nav-collapsable">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">VOLK Ad Server</Link>
          </div>

          <div className="collapse navbar-collapse" id="nav-collapsable">
            <p className="navbar-text navbar-right">Welcome, <a href="#" className="navbar-link">Nathan</a></p>
            <ul className="nav navbar-nav">
              <NavLi to="trafficking">Trafficking</NavLi>
              <NavLi to="reporting">Reporting</NavLi>
              <NavLi to="inventory">Inventory</NavLi>
            </ul>
            <form className="navbar-form" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
            </form>
          </div>

        </div>
          
      </nav>
  }
});

