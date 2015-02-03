/** @jsx React.DOM */

var React = require('react');
var marty = require('marty');

var orderActionCreators = require('../actions/orderActionCreators');
var orderStore = require('../stores/orderStore');

var createOrderStateMixin = marty.createStateMixin({
  listenTo: orderStore,
  getState: function() {
    return this.state.newOrder;
  }
});

module.exports = React.createClass({
  mixins: [ createOrderStateMixin ],

  submitOrder: function() {
    orderActionCreators.createOrder(this.state);
  },

  onChangeName: function(e) {
    this.setState({ name: e.target.value });
  },

  render: function() {
    var buttonClass = 'btn-default';
    var buttonGlyph = 'glyphicon-ok';
    var submitAction = this.submitOrder;
    if(this.state.submission && this.state.submission.when) {
      this.state.submission.when({
        pending: function() {
          buttonClass = 'btn-warning';
          buttonGlyph = 'glyphicon-refresh';
          submitAction = '';
        },
        failed: function(err) {
          console.log(err);
          buttonClass = 'btn-danger';
          buttonGlyph = 'glyphicon-flash';
          submitAction = '';
        },
        done: function() {
          console.log('done!');
          buttonClass = 'btn-success';
          buttonGlyph = 'glyphicon-thumbs-up';
          submitAction = '';
        }
      });
    }
    return <div className="row">
        <form className="form-horizontal col-sm-12">
          <div className="row">
            <h3 className="col-sm-offset-2 col-sm-6">Add new order</h3>
          </div>
          <div className="form-group">
            <label form="newOrderBasics" className="control-label col-sm-2">Name</label>
            <div className="col-sm-6">
              <input type="text" 
                className="form-control" id="newOrderName" 
                placeholder="New Order Name" 
                value={this.state.name} onChange={this.onChangeName} />
            </div>
            <p className="col-sm-4">
              This is some tip that helps with the stuff. I don't know how long it'll be really. We'll see.
            </p>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-6">
              <div className="btn-group">
                <button type="button" onClick={submitAction} className={'btn ' + buttonClass}>
                  <span className={'glyphicon ' + buttonGlyph}></span> Create
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
