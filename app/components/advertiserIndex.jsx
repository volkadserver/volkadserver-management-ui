import React from "react";
import _ from "lodash";
import {Link} from "react-router";
import marty from "marty";
import advertiserStore from "../stores/advertiserStore.js";

var advertiserStateMixin = marty.createStateMixin(advertiserStore);

var IndexItem = React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    return (
      <tr>
        <td><Link to="advertiser" params={{ advertiserId: this.props.id }}>{this.props.advertiserName}</Link></td>
        <td>
          <span className="glyphicon glyphicon-edit pull-right"></span>
        </td>
      </tr>  
    )
  }
});

export default React.createClass({
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
