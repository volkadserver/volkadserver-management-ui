/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');

var lastKeyDown;

module.exports = React.createClass({
  getInitialState: function() {
    var initialValue = this.props.value 
      ? this.props.value[this.props.valueLabel] : '';

    var fauxBest = {};
    fauxBest[this.props.valueLabel] = '';
    return { 
      bestMatch: fauxBest,
      value: initialValue
    }
  },

  setOption: function(option) {
    var bestMatch = this.getBestMatch(option[this.props.valueLabel]);
    if(bestMatch)
      this.setState({ 
        value: bestMatch[this.props.valueLabel], 
        bestMatch: bestMatch
      });
  },

  handleBlur: function() {
    var DOMVal = this.getDOMNode().value;
    this.setState({ value: DOMVal });
    var isMatched = _.find(this.props.options, function(option) {
      return option[this.props.valueLabel] == DOMVal;
    }, this);
    if(isMatched && typeof this.props.onSelect === 'function')
      this.props.onSelect(this.state.bestMatch);
  },

  handleKeyDown: function(e) {
    var node = this.refs.field.getDOMNode();
    var value = node.value;
    if(e.keyCode === 8) {
      lastKeyDown = 8;
      var best = {};
      best[this.props.valueLabel] =  this.state.value
      this.setState({ bestMatch: best });
      return;
    }
    if(e.keyCode === 13) {
      node.blur();
      e.preventDefault();
    }

  },

  handleChange: function(e) {
    var node = this.refs.field.getDOMNode();
    var value = node.value;
    value = value.slice(0, node.selectionStart);

    var bestMatch = {};
    bestMatch[this.props.valueLabel] = value;
    if(lastKeyDown === 8)
      lastKeyDown = undefined;
    else 
      bestMatch = this.getBestMatch(value);

    this.setState(
      { value: value, bestMatch: bestMatch },
      function() {
        this.getDOMNode().setSelectionRange(value.length, bestMatch[this.props.valueLabel].length);
        if(typeof this.props.onChange == 'function')
          this.props.onChange(value);
      }
    );
  },

  getBestMatch: function(value) {
    var bestMatch = {};
    bestMatch[this.props.valueLabel] = value;
    
    return _.find(this.props.options, function(option) { 
      return option[this.props.valueLabel].lastIndexOf(value, 0) === 0;
    }, this) || bestMatch;
  },

  render: function() {
    return <input ref='field'
          onBlur={this.handleBlur}
          type="text"
          className="form-control" id="newOrderAdvertiser" 
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange} value={this.state.bestMatch.name} />
  }

});
