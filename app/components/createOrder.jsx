/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
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
});
