import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class CheckboxLabels extends Component {

    render() {
        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.props.isPromoted}
                            onClick={this.props.handleChange}
                            value="checked"
                            color="primary"
                            name="isPromoted"
                        />
                    }
                    label={this.props.label}
                />
            </FormGroup>
        );
    }
}
