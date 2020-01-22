import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { withRouter } from "react-router";

class UserMealPreview extends Component {
    state = {
        columns: [
            // { title: 'Id', field: '_id' },
            { title: 'Name', field: 'title' },
            { title: 'Type', field: 'mealType' },
            // { title: 'Date', field: 'date', type: 'date' },
            // { title: 'Time', field: 'time' },
            { title: 'Status', field: 'isActive', type: 'boolean' },
            { title: 'i am...', field: 'iAm' },
            { title: 'price', field: 'price', type: 'numeric' },

        ],
        data: [
            {  title: null, mealType: null, isActive: null, iAm: null, price: 58 },
        ],
    };
    componentDidMount() {

        this.loadTable()
        console.log('componentDidMount', this.props);


    }


    loadTable = () => {
        const meals = this.props.meals
        const userId = this.props.userId
        delete meals.isPromoted
        delete meals.cuisineType
        delete meals.cuisineType
        meals.forEach(meal => {
            if (meal.hostedBy._id === userId) {
                meal.iAm = 'Hosted'
            } else {
                meal.iAm = 'Attendent'
            }

        });
        this.setState({ data: meals })


    }
    onClickRow = (event, data) => {
        event.stopPropagation()

        console.log('id -> ', data);
        debugger
        this.props.history.push(`/meal/${data._id}`)

    }


    newActions=()=>{
        

        return[
            {
                icon: 'delete',
                tooltip: 'Save User',
                onClick: (event, rowData) => {
                    event.stopPropagation()
                }
            },
            {
                icon: 'edit',
                tooltip: 'Save User',
                onClick: (event, rowData) => {
                    console.log("HIIIII ON EDIT");
                }
            }

        ]
    }


    render() {

        return (<MaterialTable
            title="Editable Example"
            columns={this.state.columns}
            data={this.state.data}
            onRowClick={(event, data) => this.onClickRow(event, data)}
            editable={{}}
            actions={[{
                icon: 'edit',
                tooltip: 'Save User',
                onClick: (event, rowData) => {
                 event.stopPropagation()
                 if (rowData.iAm === 'Hosted') {
                     this.props.history.push(`/meal/edit/${rowData._id}`)
                 }

                }
              }
            ]}
        

        />)
    }
}
export default withRouter(UserMealPreview);  