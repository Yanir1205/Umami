
import React, { Component } from 'react';
import Moment from 'moment';

class MealPreview extends Component {

    getNextDateFromNow() {
        let max = -Infinity
        this.props.meal.occurrences.forEach(occurrence => {
            if (occurrence.date > max && occurrence.date > Date.now())
                max = occurrence
        })
        return max
    }

    getDifferenceInDays(date) {
        //calculates the difference in days between a given date and now (given in miliseconds)
        const date1 = new Date(date)
        const now = new Date(Date.now())
        const diffInDays = now.getTime() - date1.getTime() / (1000 * 60 * 60 * 24)
        return diffInDays;
    }

    getPromotionMsg() {
        //if this meal is promoted - return msg - "super host"
        //else if this meal is in 2 days from now - return msg - "hurry up"
        //else - calculate the number of attendees and return msg - No. of attendees "/" capacity
        const nextMeal = this.getNextDateFromNow()
        if (this.props.meal.isPromoted) return 'super host';
        else if (this.getDifferenceInDays(nextMeal.date) <= 2) return 'hurry up';
        return `${nextMeal.attendees.length}/${this.props.meal}`
    }

    getMainMsg() {
        if (this.props.renderType === 'location') {
            return this.props.meal.location.city
        } else return this.props.meal.cuisineType
    }

    onCardClick = (id) => {
        this.props.onCardClick(id)
    }

    render() {
        const avgRate = this.props.getAvgRate([...this.props.meal.reviews])
        let nextDate = new Date(this.getNextDateFromNow().date)
        nextDate = nextDate.toDateString().split(' ').slice(1, 3).join(' ')
        return (
            <div className="item  meal-card card-bottom-border  flex" onClick={() => this.onCardClick(this.props.meal._id)}>
                <div className="flex.column">
                    <div className="category ">{this.getPromotionMsg()}</div>
                    <img className="img-meal " src={this.props.meal.imgUrls[0]} alt=""></img>
                    <div className="flex space-between ">
                        <div>{this.getMainMsg()}</div>
                        <div>{avgRate ? Math.floor(avgRate) : ''}(⭐)</div>
                    </div>


                    <div className="flex space-between ">
                        <div>{this.props.meal.title}</div>
                        <div>{nextDate}</div>
                    </div>
                    <hr className="hr"></hr>
                    <div>{this.props.meal.description}</div>
                    <hr className="hr"></hr>
                    
                    <div className="flex align-end justify-end">{this.props.meal.price} $</div>

                </div>
            </div>
        );
    }
}
export default MealPreview;


