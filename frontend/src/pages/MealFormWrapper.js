import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import * as Yup from 'yup';
import { MealForm } from '../components/MealForm.js';
import { getById, add } from '../actions/MealActions.js';
import Meal from '../services/Meal.js';

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
});

const validationSchema = Yup.object({
  title: Yup.string('Enter a title').required('Title is required'),
  description: Yup.string('Enter your description').required('Description is required'),
  imgUrl: Yup.string('Enter an image').required('Image is required'),
  // eventDate: Yup.datetime('Enter event date').required('Enter event date'),
});


class MealFormWrapper extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {meal:{}};
  // }

  state = {meal:{}};

  componentDidMount() {
    const id = this.props.match.params.id;
    if(id) { 
      this.props.getById(id);
      this.setState = {meal: this.props.meal};
    }
  }

  submit = data => {
    //const newMeal = { title: `${data.title} ${Date.now()}`, description: data.description };
    const meal = new Meal(`${data.title} ${Date.now()}`,data.description);
    this.props.add(meal);
    this.props.history.push('/meal');
  };

  render() {
    var values = this.props.meal ? this.props.meal : { title: '', description: '', imgUrl: '' };
    console.log(values)
    return (
      <React.Fragment>
        <div className='container'>
          <Paper elevation={1} className=''>
            <h3>Create Event</h3>
            <Formik enableReinitialize render={props => <MealForm {...props} />} initialValues={values} validationSchema={validationSchema} onSubmit={this.submit} />
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    meal: state.meal.selectedMeal,
  };
};

const mapDispatchToProps = {
  getById,
  add,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MealFormWrapper);
