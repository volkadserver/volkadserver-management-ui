/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');





module.exports = React.createClass({

  render: function() {
    var buttonClass, buttonGlyph, buttonSuffix, submitAction;

    switch(this.props.status) {
      case 'pending':
        buttonClass = 'btn-warning';
        buttonGlyph = 'glyphicon-refresh';
        submitAction = '';
        buttonSuffix = 'ing';
        break;
      case 'error':
        buttonClass = 'btn-danger';
        buttonGlyph = 'glyphicon-flash';
        submitAction = '';
        buttonSuffix = '';
        break;
      case 'success':
        buttonClass = 'btn-success';
        buttonGlyph = 'glyphicon-thumbs-up';
        submitAction = '';
        buttonSuffix = 'd';
        break;
      default: 
        buttonClass = 'btn-default';
        buttonGlyph = 'glyphicon-ok';
        submitAction = this.props.onSubmit;
    }

    return  <button type="button" 
              onClick={submitAction} 
              className={'btn ' + buttonClass}>
              <span className={'glyphicon ' + buttonGlyph}></span> 
              <span> Create{buttonSuffix}</span>
            </button>;


  }
});
