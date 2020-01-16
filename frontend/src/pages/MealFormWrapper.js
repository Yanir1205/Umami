import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import * as Yup from 'yup';
import { MealForm } from '../components/MealForm.js';
import { load, add } from '../actions/MealActions.js';


const styles = theme => ({
  paper: {
    marginTop:  theme.spacing(8),
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
  title: Yup.string('Enter a title').required('title is required'),
  description: Yup.string('Enter your description').required('description is required'),
    imgUrl: Yup.string('Enter a imgUrl').required('imgUrl is required'),
  // eventDate: Yup.datetime('Enter event date').required('Enter event date'),
   
});

class MealFormWrapper extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  componentDidMount() {
    //this.props.load();
  }


  add = data => {
    console.log(data);

    //this.props.add(data);
  };


  submit = data => {
    console.log(data);
    this.props.add(data);
  };

  render() {
    const classes = this.props;  
    const values = { title: '', description: '', imgUrl: '' };
    return (
      <React.Fragment>
        <div className='container'>
          <Paper elevation={1} className={classes.paper}>
            <h3>Create Event</h3>
            <Formik render={props => <MealForm {...props} />} initialValues={values} validationSchema={validationSchema} onSubmit={this.submit} />
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    meal: state.meal.meal,
  };
};

const mapDispatchToProps = {
  load,
  add
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MealFormWrapper);
