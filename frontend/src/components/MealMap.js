import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const GOOGLE_API_KEY = 'AIzaSyDt708aK1FKYJTOT61i_xrzY9R3UD3_6Lw&&';

const mapContainerStyle = {
  width: '48vw',
  height: '35vh',
  // paddingBottom:'120vh',
  // margin: '20px 200px 20px 0px',
  marginBottom: '60vh',
  zIndex: -1,

};

class MealMap extends Component {
  // defaultProps = {
  //   center: {
  //     lat: this.props.location.lat,
  //     lng: this.props.location.lng,
  //   },
  //   zoom: 20,
  // };

  render() {
    const location = { ...this.props.location };
    delete location.address;
    delete location.city;
    delete location.country;
    return (<Map
      style={mapContainerStyle} google={this.props.google} initialCenter={location} zoom={14}>
      <Marker name={'Current location'} />
    </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(MealMap);
// className='card-container-horizontal '