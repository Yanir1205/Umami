import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DatePicker } from "@material-ui/pickers";


export class Calander extends Component {

    render() {
        return (
            <div>
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