import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { withRouter } from "react-router";
import { getById, add } from '../actions/MealActions';
import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";

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
        dateShow: [
        ]
    };
    componentDidMount() {
        this.loadTable()
    }

    loadTable = () => {
        const meals = [...this.props.meals]
        const userId = this.props.userId
        delete meals.isPromoted
        delete meals.cuisineType
        delete meals.cuisineType
        const currMeal = {}
        const currMeals = []
        meals.forEach(meal => {
            if (meal.hostedBy._id === userId) {
                meal.iAm = 'Hosted'
                meal.isHosted = true
                meal.occurrences.forEach(occurrence => {
                    this.setState(prevState => ({ occurrences: [...prevState.occurrences, occurrence] }));
                })

            } else {
                meal.iAm = 'Attendent'
                meal.date = new Date(meal.date).toString().split(' ').slice(1, 4).join(' ')
            }
            currMeals.push(meal);

        });

        // this.state.data.push({ currMeals })
        this.setState({ data: meals })

    }

    onClickRow = (event, data) => {
        event.stopPropagation()
        console.log('id -> ', data);
        this.props.history.push(`/meal/${data._id}`)

    }
    // unRegister = async (mealId,occurensId) => {
    //     await this.props.getById(mealId) 
    //     const meal ={...this.props.meal}
        
    //     const occurrence = meal.occurrences.find(occurrence =>{
    //          return occurrence.id === occurensId
             
    //     })
    //     const attendeeIdx = occurrence.attendees.findIndex(user =>{
    //         return user._id === this.props.userId  
    //     })
    //     meal.occurrences.splice( attendeeIdx , 1)
    //     this.props.add(meal)  
              

    // }
    render() {
        console.log('UserMealPreview -> occurrences', this.state.occurrences);

        return <div>
            {this.state.occurrences && <MaterialTable
                title="Editable Example"
                columns={this.state.columns}

                data={this.state.data}
                onRowClick={(event, data) => this.onClickRow(event, data)}
                editable={{ isShow: rowData => rowData.isHosted }}
                actions={[{
                    icon: 'edit',
                    tooltip: 'Edit',
                    onClick: (event, rowData) => {
                        event.stopPropagation()
                        if (rowData.isHosted) {
                            this.props.history.push(`/meal/edit/${rowData._id}`)
                        }

                    }
                }
                // , {
                //     icon: 'delete',
                //     tooltip: 'delete',
                //     onClick: (event, rowData) => {
                //         event.stopPropagation()
                //         if (!rowData.isHosted) {
                //             console.log("rowData -> ", rowData , rowData.occurensId);
                //             this.unRegister(rowData._id,rowData.occurensId)
                //         }

                //     }
                // }
                ]}
                detailPanel={rowData => {
                    console.log('UserMealPreview rowData ->', rowData);

                    return (rowData.isHosted && <div className="table ">
                        <table id='atendees ' className="table">
                            <thead>
                                <td id="Date">Date</td>
                                <td id="TotalRegistered"> Registered </td>
                                <td id="revenue">Revenue </td>
                                <td id="revenue">Commission </td>
                            </thead>
                            {rowData.occurrences.map(occurrence => {
                                return <React.Fragment>
                                    <tbody >
                                        <td >{<span>  {new Date(occurrence.date).toString().split(' ').slice(1, 4).join(' ')}</span>}</td>
                                        <td > {<span> {occurrence.total}</span>}</td>
                                        <td >{"$" + occurrence.total * rowData.price}</td>
                                        <td >{"$" + (occurrence.total * rowData.price) * 0.1}</td>
                                    </tbody>
                                </React.Fragment>


                            })}
                        </table>
                    </div>)
                }}

            />
            }</div>
    }
}

const mapStateToProps = state => ({
    loggedInUser: state.user.loggedInUser,
    meal: state.meal.selectedMeal,
});

const mapDispatchToProps = {
    getById,
    add,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserMealPreview));


