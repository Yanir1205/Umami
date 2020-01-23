import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className='main-homepage-container'>
        <div className='viewport-container flex'>
          <div className='left-container'>
            <div className=''>
              <ul className='slideshow-text'>
                <li>
                  <span className='txt-one'>Enticing All The 6 Senses</span>
                </li>
                <li>
                  <span className='txt-two'>Unique Experience</span>
                </li>
                <li>
                  <span className='txt-three'>
                    <span className='txt-three-top'>Exciting</span>
                    <br></br>
                    <span className='txt-three-bottom'>Places</span>
                  </span>
                </li>
                <li>
                  <span className='txt-four'>Gourmet Home Cooking</span>
                </li>
                <li>
                  <span className='txt-five'>JUST FOR YOU !!</span>
                </li>
                {/* <span className='word alizarin'>awesome.</span> */}
                {/* <span className='word wisteria'>beautiful.</span> */}
                {/* <span className='word peter-river'>creative.</span> */}
                {/* <span className='word emerald'>fabulous.</span> */}
                {/* <span className='word sun-flower'>interesting.</span> */}
              </ul>
            </div>
          </div>
          <div className='right-container'>
            <ul className='slideshow'>
              <li>
                <div>
                  <img src={require('../assets/img/layout/food-an-001.gif')}></img>
                </div>
              </li>
              <li>
                <div>
                  <img src={require('../assets/img/layout/food-an-002.gif')}></img>
                </div>
              </li>
              <li>
                <div>
                  <img src={require('../assets/img/layout/food-an-003.gif')}></img>
                </div>
              </li>
              <li>
                <div>
                  <img src={require('../assets/img/layout/food-an-004.gif')}></img>
                </div>
              </li>
              <li>
                <div>
                  <img src={require('../assets/img/layout/food-an-005.gif')}></img>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='bottom-container'></div>
      </div>
    );
  }
}
