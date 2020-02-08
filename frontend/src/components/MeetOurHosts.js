import React, { Component } from 'react';

export default class MeetOurHosts extends Component {
  render() {
    return (
      <div className='main-meet-hosts-container'>
        <div className='hosts'>
          <div className='host-container'>
            <img src='https://res.cloudinary.com/contentexs/image/upload/v1580359192/002.jpg' alt='Our event hosts' />
            <h2>Mary Smith</h2>
            <h3 className='host-txt'> I'm just someone who likes cooking and for whom sharing food is a form of expression.</h3>
            <blockquote className='host-reviews'>
              Amazing! I had such a fantastic time at Mary's home. She is a great host -- it felt like dinner with family. Wonderful, flavorful food and lots of it. Thank You!
              <cite>Alberto Duncan</cite>
            </blockquote>
          </div>

          <div className='host-container'>
            <img src='https://res.cloudinary.com/contentexs/image/upload/v1580360371/001.jpg' alt='Our event hosts' />
            <h2>Kathy Wilson</h2>
            <h3 className='host-txt'> I love cooking with my friends, sharing recipes and meeting new people.</h3>
            <blockquote className='host-reviews'>
              Kathy and Luc were incredibly hospitable and full of stories from their incredibly full lives. The boat was beautiful and so was the area we saw while we were on it. One of the best meals I had in my life
              <cite>Lisa Freeman</cite>
            </blockquote>
          </div>

          <div className='host-container'>
            <img src='https://res.cloudinary.com/contentexs/image/upload/v1580359192/003.jpg' alt='Our event hosts' />
            <h2>Luc Seath</h2>
            <h3 className='host-txt'> Astrophysicist by formation, IT Database Designer by profession and cook by passion.</h3>
            <blockquote className='host-reviews'>
              It was a very cozy and nice atmosphere. The food was prepared with great attention to detail and there was a huge variety of delicacies. Really very very tasty. It was great a pleasure!
              <cite>Rob Smith</cite>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}
