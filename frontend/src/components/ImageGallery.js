import React, { Component } from 'react';

class ImageGallery extends Component {
  state = {
    main: '',
    one: '',
    two: '',
    three: '',
    four: '',
  };

  componentDidMount() {
    this.setState({
      main: this.props.images[0],
      one: this.props.images[1],
      two: this.props.images[2],
      three: this.props.images[3],
      four: this.props.images[4],
    });
  }

  //TODO - Add short description to every image - figcaption
  swapWithMain = ev => {
    ev.preventDefault();
    const selected = ev.target.name;
    const selectedImage = this.state[selected];
    const main = this.state.main;
    this.setState({ main: selectedImage, [selected]: main });
  };

  render() {
    console.log('ImageGallery');
    
    return (
      <div className='image-gallery-container'>
        <figure className='main-figure'>
          <img alt='' name='main' src={this.state.main}></img>
          <figcaption className='layer'>Something about this image</figcaption>
        </figure>
        <figure>
          <img alt='' name='one' src={this.state.one} onClick={this.swapWithMain}></img>
        </figure>
        <figure>
          <img alt='' name='two' src={this.state.two} onClick={this.swapWithMain}></img>
        </figure>
        <figure>
          <img alt='' name='three' src={this.state.three} onClick={this.swapWithMain}></img>
        </figure>
        <figure>
          <img alt='' name='four' src={this.state.four} onClick={this.swapWithMain}></img>
        </figure>
      </div>
    );
  }
}

export default ImageGallery;
