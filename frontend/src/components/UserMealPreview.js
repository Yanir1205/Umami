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
            <div className="flex space-even">
              <p><EditIcon  className=" cursor" onClick={this.onEditClick}></EditIcon> </p>
              <p>Date: {date}</p>
              <p>Gusts: {occurrence.total}</p>
              <p>Capacity: {this.props.meal.capacity}</p>
              <p>Revenue: {occurrence.total * this.props.meal.price}</p>
              <p>Capacity: {(occurrence.total * this.props.meal.price) * 0.1}</p>
            </div>

          </div>
        })}
      </React.Fragment>

      )
    } else {
      return (!this.props.meal.objForHosted && <React.Fragment>
        <div className="tab-content cursor" onClick={this.onClickRow}>
          {/* <p>Date: {date}</p> */}
          <div className="flex space-even flex.column ">
            <p>Hosted By : {this.props.meal.hostedBy.fullName}</p>
          </div>
          <hr className="hr"></hr>

          <div className="flex space-even">
            <p>Location : {this.props.meal.location.address}</p>
          </div>
          <hr className="hr"></hr>
          <div className="flex space-even">
            <p>Gusts : {this.props.meal.total}</p>
            <p>price : {this.props.meal.price * this.props.meal.total}</p>
            <p>Cuisine Type : {this.props.meal.cuisineType}</p>
            <p>Meal Type : {this.props.meal.mealType}</p>
          </div>

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