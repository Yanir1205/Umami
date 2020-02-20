import React, { Component } from 'react';

class AttendeesPreview extends Component {
  render() {
    const { attendee } = this.props;
    return (
      <div className='frame'>
        <div className='card-simple-attendees center'>
          <div className='profile'>
            <div className='image'>
              <div className='circle-1'></div>
              <div className='circle-2'></div>
              <img src={attendee.imgUrl} width='70' height='70' alt={attendee.fullName} />
            </div>
            <div className='name'>{attendee.fullName}</div>
            <div className='address'>US, New-York</div>
          </div>
        </div>
      </div>
    );
  }
}

export default AttendeesPreview;
