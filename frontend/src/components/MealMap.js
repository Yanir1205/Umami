import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const GOOGLE_API_KEY = 'AIzaSyDt708aK1FKYJTOT61i_xrzY9R3UD3_6Lw&&';

const mapContainerStyle = {
  width: '48vw',
  height: '60vh',
  margin: '20px 0px 20px 0px',
  zIndex: 0,

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
    return (
      <div className='google-map-container'>
        <Map className='card-container-horizontal '
        style={mapContainerStyle} google={this.props.google} initialCenter={location} zoom={14}>
          <Marker name={'Current location'} />
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(MealMap);
