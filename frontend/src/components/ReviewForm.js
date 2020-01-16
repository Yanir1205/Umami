import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import { Button } from '@material-ui/core';
export class ReviewForm extends Component {
  onRegistration = () => {
    console.log("onRegistration");  
    
  }
  render() {
    return <div>ReviewForm - Add Review
      {/* add onSubmit to form */}
      <form onSubmit={this.onRegistration}>
        <FormControl>
          <InputLabel htmlFor="email-address">Email address</InputLabel>
          <Input id="email-address" aria-describedby="my-helper-email-address" />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="user-name">User Name</InputLabel>
          <Input id="user-name" aria-describedby="my-helper-User Name" />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" aria-describedby="my-helper-Password" />

          <Button type="submit" variant="outlined" color="primary">
            Save
          </Button>

        </FormControl>
      </form>


    </div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
