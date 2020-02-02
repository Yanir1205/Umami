import React, { Component } from 'react';

export default class MeetHostPreview extends Component {
  state = { host: null };
  componentDidMount() {
    const { host } = this.props;
    this.setState({
      host: {
        imgUrl: host.imgUrl,
        name: host.name,
        location: host.location,
        cuisine: host.cuisine,
        reviews: host.reviews
      }
    })
  }

  render() {
    return (
      <div></div>
    );
  }
}