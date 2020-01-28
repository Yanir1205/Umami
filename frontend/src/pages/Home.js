import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';

export default class Home extends Component {
  render() {
    return (
      <>
        <div className='hero-container'>
          <div className='hero-box flex column align-center'>
            <div className='text flex column align-center'>
              <span>let's eat</span>
              <span>Discover Home Cooking Around The World</span>
            </div>
            <div className='how-to'>
              <ul className='clean-list flex align-center justify-center margin-bottom-20'>
                <li>
                  <img src={require('../assets/img/layout/location.png')} alt='Food'></img>
                  <span>1.Choose Location</span>
                </li>
                <li>
                  <img src={require('../assets/img/layout/host.png')} alt='Food'></img>
                  <span>2.Choose Hosted Event</span>
                </li>
                <li>
                  <img src={require('../assets/img/layout/reservation.png')} alt='Food'></img>
                  <span>3.Register</span>
                </li>
              </ul>
            </div>
            <div className='search-container'>
              <SearchBar></SearchBar>
            </div>
          </div>
        </div>
      </>
    );
  }
}
