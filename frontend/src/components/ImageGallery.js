import React, { Component } from 'react';

class ImageGallery extends Component {
  render() {
    return (
      <div className='gallery-container '>
        <div className='gallery'>
          <figure className='gallery-item gallery-item-1'>
            <img alt='' name='main' className='gallery-img' src={this.props.meal.imgUrls[0]}></img>
          </figure>
          <figure className='gallery-item gallery-item-2'>
            <img alt='' name='one' className='gallery-img' src={this.props.meal.imgUrls[1]}></img>
          </figure>
          <figure className='gallery-item gallery-item-3'>
            <img alt='' name='two' className='gallery-img' src={this.props.meal.imgUrls[2]}></img>
          </figure>
          <figure className='gallery-item gallery-item-4'>
            <img alt='' name='three' className='gallery-img' src={this.props.meal.imgUrls[3]}></img>
          </figure>
          <figure className='gallery-item gallery-item-5'>
            <img alt='' name='four' className='gallery-img' src={this.props.meal.imgUrls[4]}></img>
          </figure>
        </div>
      </div>
    );
  }
}

export default ImageGallery;
