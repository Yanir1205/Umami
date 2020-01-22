import React, { Component } from 'react';
import { connect } from 'react-redux';

import { load, loadCuisines, loadCities, loadMealsByLocation, loadMealsByCuisine } from '../actions/MealActions';
import { setFilter } from '../actions/FlterActions';

import MealList from '../components/MealList';
import BadgeList from '../components/BadgeList';

export class MealApp extends Component {

    state = {
        selectedBadge: '',
        renderType: ''
    }

    componentDidMount() {
        if (this.props.location.pathname.includes('location')) {
            const { location } = this.props.match.params
            this.setBadges('location');
            this.setState({ renderType: 'location' }, () => this.loadMeals(location, 'location'))
        } else if (this.props.location.pathname.includes('cuisine')) {
            const { cuisine } = this.props.match.params
            this.setBadges('cuisine');
            this.setState({ renderType: 'cuisine' }, () => this.loadMeals(cuisine, 'cuisine'))
        }
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.location.pathname) !== JSON.stringify(this.props.location.pathname)) {
            const renderType = this.props.location.pathname.includes('location') ? 'location' : 'cuisine';
            this.setState({ renderType: renderType }, () => this.loadMeals(null, renderType))
        }
    }

    getAvgRate = (reviews) => {
        return reviews.reduce((acc, currReview) => acc + currReview.rate, 0) / reviews.length;
    }

    loadMeals = async (filterType, filterName) => {
        if (filterType) { //meaning it is a specific location or cuisine - set the filter accordingly
            if (filterName === 'location') { //filter by location
                await this.props.setFilter({ ...this.props.filter, location: { city: filterType } })
                debugger;
                await this.props.load(this.props.filter)
                this.setState({ renderType: 'location' }, () => this.setBadges('location'))
            }
            else if (filterName === 'cuisine') { //filter by cuisine
                await this.props.setFilter({ ...this.props.filter, type: filterType })
                await this.props.load(this.props.filter)
                this.setState({ renderType: 'cuisine' }, () => this.setBadges('cuisine'))
            }
            await this.setState({ selectedBadge: filterType })
        }
        else { //resetting any previous filter definitions to display all meals
            if (this.state.renderType === 'location') {
                this.props.loadMealsByLocation()
            }
            else if (this.state.renderType === 'cuisine') {
                this.props.loadMealsByCuisine()
            }
            // await this.props.load()
            this.setBadges(filterName)
        }
    }

    setBadges = (badgeType) => {
        if (badgeType === 'location') {
            this.props.loadCities()
        } else if (badgeType === 'cuisine') {
            this.props.loadCuisines()
        }
    }

    onLocationClick = async (event) => {
        const city = event.target.innerText
        this.props.history.push('/meal');
        await this.props.setFilter({ ...this.props.filter, location: { ...this.props.filter.location, city } })
        this.loadMeals(city, 'location')
    }

    onCuisineClick = async (event) => {
        const cuisine = event.target.innerText;
        this.props.history.push('/meal')
        await this.props.setFilter({ ...this.props.filter, type: cuisine })
        this.loadMeals(cuisine, 'cuisine')
    }

    onCardClick = (id) => {
        this.props.history.push(`/meal/${id}`)
    }

    render() {
        return <div className='container'>
            {!this.props.meals.length && <div>LOADING...</div>}
            {this.props.cuisines && this.state.renderType === 'cuisine' && <BadgeList selectedBadge={this.state.selectedBadge} onBadgeClick={this.onCuisineClick} badges={this.props.cuisines}></BadgeList>}
            {this.props.cities && this.state.renderType === 'location' && <BadgeList selectedBadge={this.state.selectedBadge} onBadgeClick={this.onLocationClick} badges={this.props.cities}></BadgeList>}

            {this.props.meals.length && this.state.renderType && <MealList onCardClick={this.onCardClick} onCuisineClick={this.onCuisineClick} onLocationClick={this.onLocationClick} renderType={this.state.renderType} meals={this.props.meals} getAvgRate={this.getAvgRate}></MealList>}
        </div>;
    }
}

const mapStateToProps = state => ({
    meals: state.meal.meals,
    filter: state.filter.filter,
    cities: state.meal.cities,
    cuisines: state.meal.cuisines
});

const mapDispatchToProps = {
    load,
    setFilter,
    loadCuisines,
    loadCities,
    loadMealsByLocation,
    loadMealsByCuisine
};

export default connect(mapStateToProps, mapDispatchToProps)(MealApp);