import React, { Component } from 'react';

export class Attendees extends Component {

  render() {
    const attendees = this.props.attendees    
    return <div className="attendees-containner">
      {attendees &&  <div > <p>Attendees</p>

         {attendees.map((attendee ,index )=> {
          return <span><img  key ={index} className="user-Img" src={attendee.imgUrl}></img> {attendee.fullName} </span>})}

        </div>}
    </div>;
  }
}

export default Attendees;