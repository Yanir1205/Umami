import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { withRouter } from 'react-router';
import EditIcon from '@material-ui/icons/Edit';
// import TableDetailsHost from './TableDetailsHost'
import 'react-datepicker/dist/react-datepicker.css';

class UserMealPreview extends Component {
  state = {
    isOnClikDate: false,
    columns: [
      // { title: 'Id', field: '_id' },
      { title: 'Name', field: 'title' },
      { title: 'Type', field: 'mealType' },
      { title: 'Date', field: 'date', type: 'string' },
      // { title: 'Time', field: 'time' },
      { title: 'Status', field: 'isActive', type: 'boolean' },
      { title: 'i am...', field: 'iAm' },
      { title: 'price', field: 'price', type: 'numeric' },
      { title: 'total ', field: 'total', type: 'numeric' },
    ],
    data: null,
    occurrences: [],
    dateShow: [],
  };
  componentDidMount() {
    // this.loadTable();
  }

  // loadTable = () => {
  //   const meals = [...this.props.meals];
  //   const userId = this.props.userId;
  //   delete meals.isPromoted;
  //   delete meals.cuisineType;
  //   delete meals.cuisineType;
  //   const currMeal = {};
  //   const currMeals = [];
  //   meals.forEach(meal => {
  //     if (meal.hostedBy._id === userId) {
  //       meal.iAm = 'Hosted';
  //       meal.isHosted = true;
  //       meal.occurrences.forEach(occurrence => {
  //         this.setState(prevState => ({ occurrences: [...prevState.occurrences, occurrence] }));
  //       });
  //     } else {
  //       meal.iAm = 'Attendent';
  //       meal.date = new Date(meal.date)
  //         .toString()
  //         .split(' ')
  //         .slice(1, 4)
  //         .join(' ');
  //     }
  //     currMeals.push(meal);
  //   });

  //   this.state.data.push({ currMeals })
  //   this.setState({ data: meals });
  // };

  onClickRow = (event, data) => {
    event.stopPropagation();
    console.log('id -> ', data);
    this.props.history.push(`/meal/${this.props.meal._id}`);
  };
  onEditClick = (event) => {
    event.stopPropagation();

    this.props.history.push(`/meal/edit/${this.props.meal._id}`)
  }
  render() {
    const occurrences = this.props.meal.occurrences

    if (this.props.meal.objForHosted) {
      return (<React.Fragment>
        {occurrences && occurrences.map((occurrence) => {
          const date = new Date(occurrence.date).toLocaleDateString()
          return <div className="tab-content ">
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
      </React.Fragment>

      )
    } else {
     const date = new Date(this.props.meal.date ).toLocaleDateString()
      return (!this.props.meal.objForHosted && <React.Fragment>
        <div className="tab-content cursor " onClick={this.onClickRow} title="Click me to see event">
          <ul className="guest-list clean-list">
            <ul className="clean-list flex space-between  ">
              <li><span>Hosted By:</span> <span>{this.props.meal.hostedBy.fullName}</span></li>
              <li><span>Date: </span><span>{date}</span></li>
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


        // return (
//   <div>
//     {this.state.occurrences && (
//       <MaterialTable
//         title='Editable Example'
//         columns={this.state.columns}
//         data={this.state.data}
//         onRowClick={(event, data) => this.onClickRow(event, data)}
//         editable={{ isShow: rowData => rowData.isHosted }}
//         actions={[
//           {
//             icon: 'edit',
//             tooltip: 'Edit',
//             onClick: (event, rowData) => {
//               event.stopPropagation();
//               if (rowData.isHosted) {
//                 this.props.history.push(`/meal/edit/${rowData._id}`);
//               }
//             },
//           },
//         ]}
//         detailPanel={rowData => {
//           console.log('UserMealPreview rowData ->', rowData);
//           return <TableDetailsHost rowData={rowData}> </TableDetailsHost>
//         }}
//       />
//     )}
//   </div>
// );