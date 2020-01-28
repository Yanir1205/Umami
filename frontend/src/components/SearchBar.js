import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { setFilter } from '../actions/FilterActions';

export class SearchBar extends Component {
  state = {
    val: '',
  };

  handleChange = async event => {
    if (event.key !== 'Enter') {
      this.setState({ val: event.target.value });
    }
  };

  onSearchAction = async event => {
    if (event.key === 'Enter' || event.type === 'click') {
      const res = this.state.val;
      await this.setState({ val: '' });
      this.props.history.push(`/meal/results/${res}`);
    }
  };

  render() {
    return (
      <div className='main-search-container'>
        <input className='search-input' type='text' placeholder='Where to? What are you craving?  ' value={this.state.val} onChange={this.handleChange} onKeyUp={this.onSearchAction}></input>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filter: state.filter.filter,
});

const mapDispatchToProps = {
  setFilter,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));

/*

<div className="search-bar container">
<input className="search-bar" type="text" onChange={this.handleChange} onKeyUp={this.onSearchAction} placeholder="Search Events..." value={this.state.val}></input>
<button className="btn" onClick={this.onSearchAction}>Search</button>
</div>


*/
