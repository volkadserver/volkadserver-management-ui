/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');
var Link = require('react-router').Link;
var marty = require('marty');
var advertiserStore = require('../stores/advertiserStore.js');

var advertiserStateMixin = marty.createStateMixin(advertiserStore);

var IndexItem = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <tr>
        <td><Link to="advertiser" params={{ advertiserId: this.props.id }}>{this.props.name}</Link></td>
        <td>
          <span className="glyphicon glyphicon-edit pull-right"></span>
        </td>
      </tr>  
    )
  }
});

module.exports = React.createClass({
  mixins: [ advertiserStateMixin ],

  render: function() {
    var indexItems =  _.map(this.state.advertisers, function(advertiser, i) {
          if(typeof advertiser.id !== 'undefined')
            return <IndexItem {...advertiser} key={i} />;
        });

    return <div className="row">
        <table className="table table-hover table-condensed">
          <thead>
            <th>Name</th>
            <th></th>
          </thead>
          <tbody>
            {indexItems}
          </tbody>
        </table>
      </div>
  }
});
