import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { withRouter } from 'react-router';
import EditIcon from '@material-ui/icons/Edit';
// import TableDetailsHost from './TableDetailsHost'
import 'react-datepicker/dist/react-datepicker.css';

class UserMealPreview extends Component {

  componentDidMount() {
  }

  onClickRow = (event, data) => {
    event.stopPropagation();
    this.props.history.push(`/meal/${this.props.meal._id}`);
  };
  onEditClick = (event) => {
    event.stopPropagation();

    this.props.history.push(`/meal/edit/${this.props.meal._id}`)
  }

  onDelete = (event) => {
    event.stopPropagation();

    const { id } = this.props.match.params;
    const userId = id
    const mealId = this.props.meal._id
    const occurensId = this.props.meal.occurensId

    this.props.onDelete(userId,mealId,occurensId)
  }

  render() {
    const occurrences = this.props.meal.occurrences
    
    if (this.props.meal.objForHosted) {
      return (<React.Fragment>
        {occurrences && occurrences.map((occurrence) => {
          const date = new Date(occurrence.date).toLocaleDateString()
          return <div key={"Key" + occurrences.id} className="tab-content ">
            <div className=" ">
              <ul className="host-list flex space-around clean-list">
                <li><span>Date: </span><span>{date}</span></li>
                <li><span>Total Guests:</span><span> {this.props.meal.capacity}</span></li>
                <li><span>Registered Guests:</span> <span>{occurrence.total}</span></li>
                <li><span>Revenue:</span> <span>{occurrence.total * this.props.meal.price} </span></li>
                <li><span>Commission:</span> <span> {(occurrence.total * this.props.meal.price) * 0.1}</span></li>
                <li><span> <EditIcon className=" cursor" onClick={this.onEditClick}></EditIcon> </span></li>
              </ul>
            </div>
          </div>
        })}
      </React.Fragment>)
    } else {
      const date = new Date(this.props.meal.date).toLocaleDateString()
      return (!this.props.meal.objForHosted && <React.Fragment>
        <div className="tab-content cursor " onClick={this.onClickRow} title="Click me to see event">
          <ul className="guest-list clean-list">
            <ul className="clean-list flex space-between  ">
              <li><span>Hosted By:</span> <span>{this.props.meal.hostedBy.fullName}</span></li>
              <li><span>Date: </span><span>{date}</span></li>
              <li><span onClick={this.onDelete} title="delete me from event">🗑️</span></li>
            </ul>
            <ul className="clean-list flex justify-start">
              <li><span>Location: </span> <span>{this.props.meal.location.address}</span></li>
            </ul>
            <ul className="clean-list flex align-start space-between">
              <li><span>Cuisine: </span> <span>{this.props.meal.cuisineType}</span></li>
              <li><span>Meal: </span> <span>{this.props.meal.mealType}</span></li>
              <li><span>My Guests:</span> <span>{this.props.meal.total}</span></li>
              <li><span>Total Price: </span> <span>${this.props.meal.price * this.props.meal.total} </span><small>(${this.props.meal.price} per guest)</small></li>
            </ul>
          </ul>
        </div>
      </React.Fragment>)
    }
  }
}
export default withRouter(UserMealPreview);

