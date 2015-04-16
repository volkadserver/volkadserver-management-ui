var React = require('react');
var Router = require('react-router');

var advertiserActionCreators = require('../actions/advertiserActionCreators');
var advertiserStore = require('../stores/advertiserStore');
var CreateButton = require('./createButton.jsx');


module.exports = React.createClass({
  mixins: [ Router.State ],

  getInitialState: function() {
    return { advertiserName: '' };
  },

  onSaveSuccess: function() {
    

    if(typeof this.props.onSaveSuccess === 'function')
      this.props.onSaveSuccess(this.state);
  },

  submitAdvertiser: function() {
    advertiserActionCreators.createAdvertiser(
      this.state, 
      { 
        pending: function() { this.setState({ status: 'pending' }); }.bind(this),
        error: function(err) { 
          this.setState({ status: 'error' });
        }.bind(this),
        success: function() { 
          this.setState({ status: 'success', saved: true }); 
          this.onSaveSuccess();
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
            <h3 className="col-sm-offset-2 col-sm-6">Add new advertiser</h3>
          </div>
          <div className="form-group">
            <label form="newAdvertiserBasics" className="control-label col-sm-2">Name</label>
            <div className="col-sm-6">
              <input type="text" 
                className="form-control" id="newAdvertiserName" 
                placeholder="New Advertiser Name" 
                value={this.state.advertiserName} 
                onChange={this.onChange.bind(this, 'advertiserName')} />
            </div>
            <p className="col-sm-4">
              This is some tip that helps with the stuff. I don't know how long it'll be really. We'll see.
            </p>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-6">
              <div className="btn-group">
                <CreateButton 
                  onSubmit={this.submitAdvertiser} 
                  status={this.state.status} />
              </div>
            </div>
          </div>
        </form>
      </div>
  }
});
