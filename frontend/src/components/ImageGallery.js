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
      main: this.props.meal.imgUrls[0],
      one: this.props.meal.imgUrls[1],
      two: this.props.meal.imgUrls[2],
      three: this.props.meal.imgUrls[3],
      four: this.props.meal.imgUrls[4],
    });
  }

  swapWithMain = ev => {
    ev.preventDefault();
    const selected = ev.target.name;
    const selectedImage = this.state[selected];
    const main = this.state.main;
    this.setState({ main: selectedImage, [selected]: main });
  };

  render() {
    return (
      <div className='image-gallery-container'>
        <figure className='main-figure'>
          <img alt='' name='main' src={this.props.meal.imgUrls[0]}></img>
        </figure>
        <figure>
          <img alt='' name='one' src={this.props.meal.imgUrls[1]} onClick={this.swapWithMain}></img>
        </figure>
        <figure>
          <img alt='' name='two' src={this.props.meal.imgUrls[2]} onClick={this.swapWithMain}></img>
        </figure>
        <figure>
          <img alt='' name='three' src={this.props.meal.imgUrls[3]} onClick={this.swapWithMain}></img>
        </figure>
        <figure>
          <img alt='' name='four' src={this.props.meal.imgUrls[4]} onClick={this.swapWithMain}></img>
        </figure>
        
      </div>
    );
  }
}

export default ImageGallery;
