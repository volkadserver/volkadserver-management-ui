/** @jsx React.DOM */

var React = require('react');

module.exports= React.createClass({
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
            <a className="navbar-brand" href="#">VOLK Ad Server</a>
          </div>

          <div className="collapse navbar-collapse" id="nav-collapsable">
            <p className="navbar-text navbar-right">Welcome, <a href="#" className="navbar-link">Nathan</a></p>
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Campaigns<span className="sr-only">(current)</span></a></li>
              <li><a href="#">Reporting</a></li>
              <li><a href="#">Inventory</a></li>
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

