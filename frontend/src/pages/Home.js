import React, { Component } from 'react';
import SearchBar from '../components/SearchBar';

export default class Home extends Component {
  render() {
    return (
      <>
        <div className='main-homepage-container container flex'>
          <div className='left-container flex-basis-80 flex column space-between'>
            <div className='left-border'>
              <span className='home-title'>unlocking the senses</span>
            </div>
            <div className='text-container'>
              <div className='right-border top-border'>
                <div className='text'>
                  <p>
                    Connecting people through unique culinary experiences in locations all around the world. catered by our talented, hand-selected hosts. You're invited to enjoy an elegant dinner in Paris or discover the intriguing
                    world of preparing Uzbek Samosa
                    {/* Connecting people through unique culinary experiences in locations all around the world. catered by our talented, hand-selected hosts. You're invited to enjoy an elegant dinner in Paris ,go on a delicious food tour on the exquisite markets of Marrakesh or discover the intriguing */}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='right-container flex-basis-40'>
            <ul className='slideshow clean-list'>
              <li>
                <img src='https://res.cloudinary.com/contentexs/image/upload/v1580045659/food-an-001.gif' alt='Food'></img>
              </li>
              <li>
                <img src='https://res.cloudinary.com/contentexs/image/upload/v1580045617/food-an-002.gif' alt='Food'></img>
              </li>
              <li>
                <img src='https://res.cloudinary.com/contentexs/image/upload/v1580045655/food-an-003.gif' alt='Food'></img>
              </li>
              <li>
                <img src='https://res.cloudinary.com/contentexs/image/upload/v1580045655/food-an-004.gif' alt='Food'></img>
              </li>
              <li>
                <img src='https://res.cloudinary.com/contentexs/image/upload/v1580045665/food-an-005.gif' alt='Food'></img>
              </li>
            </ul>
          </div>
        </div>
        <div className='container flex align-center justify-center'>
          <SearchBar></SearchBar>
        </div>
      </>
    );
  }
}
