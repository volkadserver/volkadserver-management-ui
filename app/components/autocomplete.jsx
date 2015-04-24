import React from "react";
import fuzzySet from "fuzzyset.js";
import _ from "lodash";

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    let initialValue = this.props.value ? this.props.value[this.props.valueLabel] : '',
        fauxBest = { [this.props.valueLabel]: '' };

    this.state = {
      bestMatch: { [this.props.valueLable]: '' },
      value: initialValue,
      fuzz: []
    }
  }

  getOptions() { 
    return Object.values(this.props.options);
  }

  setOption(option) {
    let bestMatch = this.getBestMatch(option[this.props.valueLabel]);
    if(bestMatch)
      this.setState({
        value: bestMatch[this.props.valueLabel],
        bestMatch: bestMatch
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value != nextState.bestMatch.id || this.state != nextState;
  }

  componentDidUpdate(nextProps, nextState) {
    let isMatched = this.getOptions().find( option => {
      return option[this.props.valueLabel] == this.state.value;
    });
    if(isMatched && typeof this.props.onSelect === 'function')
      this.props.onSelect(this.state.bestMatch);
  }

  handleBlur() {
    let DOMVal = React.findDOMNode(this.refs.field).value;
    this.setState({ value: DOMVal });
  }

  handleKeyDown(e) {
    let node = React.findDOMNode(this.refs.field);
    let value = node.value;
    if(e.keyCode === 8) {
      this.lastKeyDown = 8;
      let best = { [this.props.valueLabel]: this.state.value };
      this.setState({ bestMatch: best });
      return;
    }
    if(e.keyCode === 13) {
      node.blur();
      e.preventDefault();
    }
  }

  handleChange(e) {
    let node = React.findDOMNode(this.refs.field);
    let value = node.value;
    value = value.slice(0, node.selectionStart);

    let bestMatch = { [this.props.valueLabel]: value };

    if(this.lastKeyDown === 8) this.lastKeyDown = undefined;
    else bestMatch = this.getBestMatch(value);

    this.getFuzzyMatches(value);

    this.setState({ value, bestMatch }, () => { 
        node.setSelectionRange(value.length, bestMatch[this.props.valueLabel].length);
        if(typeof this.props.onChange == 'function')
          this.props.onChange(value);
      });
  }

  getFuzzyMatches(value) {
    let set = fuzzySet(_.pluck(this.props.options, this.props.valueLabel), true, 1, 2),
        fuzz = (set.get(value) || []).map(a => a[1]);

    this.setState({ fuzz });
  }

  getBestMatch(value) {
    let bestMatch = { [this.props.valueLabel]: value };

    return this.getOptions().find(option => {
      if(option[this.props.valueLabel])
        return option[this.props.valueLabel].lastIndexOf(value, 0) === 0;
    }) || bestMatch;
  }

  render() {
    return <div>
        <input ref='field'
            onBlur={this.handleBlur.bind(this)}
            type="text"
            className="form-control" id="newOrderAdvertiser" 
            onKeyDown={this.handleKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)} 
            value={this.state.bestMatch.advertiserName} />
          <span style={{ position: 'absolute', bottom: -14, left: 20, fontSize: 9 }} > { this.state.fuzz.join(', ') }</span>
        </div>
  }
}

export default AutoComplete;
