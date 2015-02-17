/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var lastKeyDown;

module.exports = React.createClass({
  getInitialState: function() {
    return { input: '', bestMatch: { name: '' } }
  },

  handleClick: function(val) {
    this.setState({ input: val });
  },

  handleKeyDown: function(e) {
    var node = this.refs.field.getDOMNode();
    var input = node.value;
    if(e.keyCode === 8) {
      lastKeyDown = 8;
      this.setState({ bestMatch: { name: this.state.input } });
      return;
    }
    if(e.keyCode === 13) {
      node.blur();
      e.preventDefault();
    }

  },

  handleChange: function(e) {
    var node = this.refs.field.getDOMNode();
    var input = node.value;
    input = input.slice(0, node.selectionStart);

    var bestMatch = { name: input };
    if(lastKeyDown === 8)
      lastKeyDown = undefined;
    else 
      bestMatch = this.getBestMatch(input);

    this.setState(
      { input: input, bestMatch: bestMatch },
      function() {
        this.getDOMNode().setSelectionRange(input.length, bestMatch.name.length);
      }
    );
  },

  getBestMatch: function(input) {
    return _.find(this.props.options, function(option) { 
      return option.name.lastIndexOf(input, 0) === 0;
    }) || { name: input };
  },

  render: function() {
    return <input ref='field'
          type="text"
          selectionStart={this.state.input.length}
          selectionDirection="backward"
          selectionEnd={this.state.bestMatch.name.length}
          className="form-control" id="newOrderAdvertiser" 
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange} value={this.state.bestMatch.name} />
  }

});
