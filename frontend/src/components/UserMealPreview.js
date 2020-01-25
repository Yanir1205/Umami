import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { withRouter } from "react-router";
import DatePicker from "react-datepicker";

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
        data: [
            // {  title: null, mealType: null, isActive: null, iAm: null,total:null, price: null },
        ],
        occurrences: [
        ],
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
                currMeal.iAm = 'Hosted'
                currMeal.isHosted = true
                meal.occurrences.forEach(occurrence => {
                    this.setState(prevState => ({ ...prevState, occurrences: occurrence }));
                })

            } else {
                meal.iAm = 'Attendent'
                meal.date = new Date(meal.date).toString().split(' ').slice(1, 4).join(' ')
            }
            currMeals.push(currMeal);

        });

        // this.state.data.push({ currMeals })
        this.setState({ data: meals })
    }

    onClickRow = (event, data) => {
        event.stopPropagation()
        console.log('id -> ', data);
        this.props.history.push(`/meal/${data._id}`)

    }

    render() {
        const isShow = !this.state.data.isHosted
        console.log('UserMealPreview', this.state);

        return <div>
            {/* {this.state.isOnClikDate && <DatePicker
                selected={this.state.occurrences.date}
                isCalendarOpen={this.state.isOnClikDate}
                inline={true}
                dayClassName={date =>
                    this.state.occurrences.date
                }
            />} */}
            <MaterialTable
                title="Editable Example"
                columns={this.state.columns}

                data={this.state.data, this.state.data}
                onRowClick={(event, data) => this.onClickRow(event, data)}
                editable={{ isShow: rowData => rowData.isHosted === "a" }}
                actions={[{
                    icon: 'edit',
                    tooltip: 'Edit',
                    onClick: (event, rowData) => {
                        event.stopPropagation()
                        if (rowData.iAm === 'Hosted') {
                            this.props.history.push(`/meal/edit/${rowData._id}`)
                        }

                    }
                },
                isShow && {
                    icon: 'eventNote',
                    tooltip: 'Event Note',
                    onClick: (event, rowData) => {
                        this.setState(prevState => ({ ...prevState, isOnClikDate: !prevState.isOnClikDate }))
                    }
                }
                ]}
                detailPanel={rowData => {
                    console.log('UserMealPreview rowData ->', rowData);

                    return (rowData.objForHosted && <div>
                        <div className="flex  margin-bottom-10">{rowData.occurrences.map(occurrence => {
                            return <div className="card-border   ">
                                <div className="flex align-center justify-center">

                                    <h3>{new Date(occurrence.date).toString().split(' ').slice(1, 4).join(' ')}</h3>
                                
                                </div>
                                <p>Total invited: {occurrence.total}</p>
                                    <p className="flex " >guest list </p>
                                {occurrence.attendees.map(attendee => {
                                    return <div className="card-border align-center margin-bottom-10">
                                        <p className=" flex align-center"> <img className="user-img-propile" src={attendee.imgUrl}></img> {attendee.fullName}</p>
                                        <p className="flex">Number of invitees: {attendee.numOfAttendees} </p>
                                    </div>
                                
                                })}
                                </div>
                        })}</div>
                    </div>)
                }}

            />
        </div>
    }
}
export default withRouter(UserMealPreview);  