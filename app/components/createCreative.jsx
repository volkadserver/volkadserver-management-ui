var React = require('react');
var Router = require('react-router');

var creativeActionCreators = require('../actions/creativeActionCreators');
var creativeStore = require('../stores/creativeStore');
var CreateButton = require('./createButton.jsx');

module.exports = React.createClass({
  mixins: [ Router.State, Router.Navigation ],

  getInitialState: function() {
    return { creativeName: '', creativeContent: '' };
  },

  onSaveSuccess: function(creative) {
    if(typeof this.props.onSaveSuccess === 'function') {
      this.props.onSaveSuccess(creative);
    }
    else {
      this.transitionTo('creative', { id: creative.creativeId });
    }
  },

  submitCreative: function() {
    console.log('submitting');
    creativeActionCreators.createCreative(
      this.state, 
      this.props.flightId || this.getParams().id,
      { 
        pending: function() { this.setState({ status: 'pending' }); }.bind(this),
        error: function(err) { 
          console.log(err);
          this.setState({ status: 'error' });
        }.bind(this),
        success: function(creative) { 
          this.setState({ status: 'success', saved: true }); 
          this.onSaveSuccess(creative);
        }.bind(this)
      }
    );
  },

  onChange: function(val, e) {
    var change = {};
    change[val] = e.target.value;
    this.setState(change);
  },

  render: function() {
    return <div className="row">
        <form className="form-horizontal col-sm-12">
          <div className="row">
            <h3 className="col-sm-offset-2 col-sm-6">Add new creative</h3>
          </div>
          <div className="form-group">
            <label form="newCreativeBasics" className="control-label col-sm-2">Name</label>
            <div className="col-sm-6">
              <input type="text" 
                className="form-control" id="newCreativeName" 
                placeholder="New Creative Name" 
                value={this.state.creativeName} 
                onChange={this.onChange.bind(this, 'creativeName')} />
            </div>
            <p className="col-sm-4">
              What would you like to name this creative?
            </p>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2">Content</label>
            <div className="col-sm-6">
              <textarea className="form-control" 
                id="newCreativeContent"
                placeholder="Put tag here"
                value={this.state.creativeContent}
                onChange={this.onChange.bind(this, 'creativeContent')} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-6">
              <div className="btn-group">
                <CreateButton 
                  onSubmit={this.submitCreative} 
                  status={this.state.status} />
              </div>
            </div>
          </div>
        </form>
      </div>
  }
});
