import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DatePicker } from "@material-ui/pickers";


export class Calander extends Component {

    // state = {
    //     date: new Date(Date.now())
    // }

    // handleDateChange = (newDate) => {
    //     debugger
    //     this.setState({ date: newDate });
    // }

    render() {
        return (
            <div>
                {/* <DatePicker
                    autoOk
                    variant="static"
                    openTo="year"
                    value={this.state.date}
                    onChange={this.handleDateChange}
                /> */}

                <DatePicker
                    autoOk
                    orientation="landscape"
                    variant="static"
                    openTo="date"
                    value={this.props.date}
                    onChange={this.props.onDateChange}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Calander);


// export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MealFormWrapper);

/*

import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";

const StaticDatePicker = () => {
  const [date, changeDate] = useState(new Date());

  // prettier-ignore
  return (
    <>
      <DatePicker
        autoOk
        variant="static"
        openTo="year"
        value={date}
        onChange={changeDate}
      />

      <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={date}
        onChange={changeDate}
      />
    </>
  );
};

export default StaticDatePicker;

*/




// ----------------------------------------------------

/*

import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export class Calander extends Component {

    state = {
        selectedDate: new Date('2014-08-18T21:11:54')
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="MM/dd/yyyy"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        label="Time picker"
                        value={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        )
    }
}

*/