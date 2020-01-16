import React, { Component } from 'react';

export class Attendees extends Component {

  render() {
    const attendees = this.props.attendees    
    return <div className="attendees-containner">
      {attendees &&  <div > <p>Attendees</p>

         {attendees.map((attendee  )=> {
          return <span>{attendee.fullName+ ' '}<img className="user-Img" src={attendee.imgUrl}></img> </span>})}

        </div>}
    </div>;
  }
}

export default Attendees;