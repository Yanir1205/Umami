import React, { Component } from 'react';

class ImageGallery extends Component {
  render() {
    const { images } = this.props;

    return (
      <div className='gallery-container '>
        <div className='gallery'>
          <figure className='gallery-item gallery-item-1'>
            <img alt='' name='main' className='gallery-img' src={images[0]}></img>
          </figure>
          <figure className='gallery-item gallery-item-2'>
            <img alt='' name='one' className='gallery-img' src={images[1]}></img>
          </figure>
          <figure className='gallery-item gallery-item-3'>
            <img alt='' name='two' className='gallery-img' src={images[2]}></img>
          </figure>
          <figure className='gallery-item gallery-item-4'>
            <img alt='' name='three' className='gallery-img' src={images[3]}></img>
          </figure>
          <figure className='gallery-item gallery-item-5'>
            <img alt='' name='four' className='gallery-img' src={images[4]}></img>
          </figure>
        </div>
      </div>
    );
  }
}

export default ImageGallery;
