/** @jsx React.DOM */

var React = require('react');

var Link = require('react-router').Link;
var RouteHandler = require('react-router').RouteHandler;
var apiClient = require('../js/apiClient');

module.exports = {
  master: React.createClass({
    render: function() {
      return (
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="trafficking" className="navbar-brand">Trafficking</Link>
              </div>

              <Link className="btn btn-primary navbar-btn pull-right" to="create-order">
                <span className="glyphicon glyphicon glyphicon-plus"></span> Create Order
              </Link>
            </div>
          </nav>
          <div className="container-fluid">
            <RouteHandler />
          </div>
        </div>
      )
    }
  }),

  index: React.createClass({
    getInitialState: function() {
      return {
        indexItems: []
      }
    },

    componentDidMount: function() {
      apiClient.Orders.find(function(data) { 
        this.setState({ indexItems: data.obj });
      }.bind(this));
    },

    render: function() {
      var IndexItem = module.exports.indexItem;

      var indexItems = [];
      for(var i in this.state.indexItems) {
        indexItems.push(<IndexItem {...this.state.indexItems[i]} />);
      }

      return <div className="row">
          <table className="table table-hover table-condensed">
            <thead>
              <th>Remaining Flights</th>
              <th>Status</th>
              <th>Name</th>
              <th></th>
            </thead>
            <tbody>
              {indexItems}
            </tbody>
          </table>
        </div>
    }
  }),

  indexItem: React.createClass({
    getInitialState: function() {
      return {};
    },

    render: function() {
      return <tr>
          <td>{this.props.id}</td>
          <td><strong>Active</strong></td>
          <td><Link to="order" params={this.props}>{this.props.name}</Link></td>
          <td>
            <span className="glyphicon glyphicon-edit pull-right"></span>
          </td>
        </tr>  
    }
  }),

  createOrder: React.createClass({
    render: function() {
      return <div className="row">
          <form className="form-horizontal col-sm-12">
            <div className="row">
              <h3 className="col-sm-offset-2 col-sm-6">Add new order</h3>
            </div>
            <div className="form-group">
              <label form="newOrderBasics" className="control-label col-sm-2">Name</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="newOrderName" placeholder="New Order Name" />
              </div>
              <p className="col-sm-4">
                This is some tip that helps with the stuff. I don't know how long it'll be really. We'll see.
              </p>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-6">
                <div className="btn-group">
                  <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-ok"></span> Create
                  </button>
                  <button type="button" className="btn btn-info">
                    <span className="glyphicon glyphicon-plus"></span> Flights
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
    }
  }),


  order: React.createClass({
    render: function() {
      return <div className="row">
        <div className="page-header">
          <h1>Order 15 <small>Its details and flights should be below</small></h1>
        </div>
        <Link to="create-flight" className="btn btn-info">
          <span className="glyphicon glyphicon-plus"></span> Flights
        </Link>
      </div>
    }
  }),

  createFlight: React.createClass({
    render: function() {
      return <div className="row">
          <h2>On this page, you will create a flight</h2>
        </div>
    }
  })

};

