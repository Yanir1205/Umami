import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getById } from '../actions/MealActions'
import Menu from '../components/Menu'
import Attendees from '../components/Attendees'
import ReviewList from '../components/ReviewList'
import ReviewForm from '../components/ReviewForm'


import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`,
  },
  formContainer: {
    maxWidth: '200px',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  }
});


export class MealDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getById(id);
  }
  render() {
    const classes = this.props;
    const meal = this.props.meal
    return <div className="container">MEAL DETAILS
      {meal && <div>
        <img style={{ width: '400px', height: '200px' }} src={meal.imgUrls[0]} alt=""></img>
        <h2>{meal.title}</h2>
        <p> {meal.txt}</p>
        <div className="meal-details">
          <div className="hosted-by">
            
            <Paper elevation={1} className={classes.paper}><p>hosted by</p>
              <p>   <img className="user-Img" src={meal.hostedBy.imgUrl} alt=""></img>
                {meal.hostedBy.fullName} </p>
              <p>Adrress: {meal.location.address}</p>
            </Paper>

            <Paper elevation={1} className={classes.paper}>
              <Attendees attendees={meal.attendees}></Attendees>
            </Paper>
          </div>
          <Paper elevation={1} className={classes.paper}>
            <Menu menu={meal.menu} />
          </Paper>

          <Paper elevation={1} className={classes.paper}>
            <ReviewForm></ReviewForm>
          </Paper>

        </div>

        <Paper elevation={4} className={classes.paper}>
          <ReviewList reviews={meal.reviews}></ReviewList>
          <Button type="submit" variant="outlined" color="primary">
            Add Review
          </Button>
        </Paper>

      </div>}
    </div>
  }
}

const mapStateToProps = state => ({ meal: state.meal.meal });

const mapDispatchToProps = {
  getById,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
