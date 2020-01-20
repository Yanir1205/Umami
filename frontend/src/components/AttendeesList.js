import React, { Component } from 'react';
import AttendeesPreview from './AttendeesPreview';

class AttendeesList extends Component {
  render() {
    console.log('AttendeesList');
    const { attendees } = this.props;
    return (
      <div className='main-attendees-container'>
        {attendees &&
          attendees.map((attendee, idx) => {
            return <AttendeesPreview key={idx} attendee={attendee}></AttendeesPreview>;
          })}
      </div>
    );
  }
}
export default AttendeesList;
