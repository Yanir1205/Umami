import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const GOOGLE_API_KEY = 'AIzaSyDt708aK1FKYJTOT61i_xrzY9R3UD3_6Lw&&';

const mapContainerStyle = {
  width: '60vw',
  height: '45vh',
  // zIndex: -1,
};

class MealMap extends Component {

  render() {
    const location = { ...this.props.location };
    delete location.address;
    delete location.city;
    delete location.country;
    return (
      <Map style={mapContainerStyle} google={this.props.google} initialCenter={location} zoom={14}>
        <Marker name={'Current location'} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY,
})(MealMap);
