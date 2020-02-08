import React, { Component } from 'react';
import AttendeesPreview from './AttendeesPreview';

class AttendeesList extends Component {

  getAttendeeList() {
    const { currOccurrance } = this.props;
    const attendees = []
    currOccurrance.reservations.forEach(occurrance => {
      attendees.push(occurrance.user)
    })
    return attendees
  }

  render() {
    // const { attendees } = this.props;
    const attendees = this.getAttendeeList();
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
