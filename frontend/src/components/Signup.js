import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../actions/UserActions';


export class Singup extends Component {
  state = {
    modalIsOpen: false,
    fullName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    imgUrl: '',
  };


  changeInput = ev => {
    let field = ev.target.name;
    let value = ev.target.value;
    this.setState({ [field]: value });

  };






  onSignup = () => {
    const user = this.state;
    delete user.modalIsOpen;
    this.props.signup(user);
  };

  render() {
    return (
      <div>
        <a onClick={this.openModal}>signup</a>
        <div className='log-in'>
          <input type='text' placeholder='Full Name' onChange={this.changeInput} name='fullName'></input>
          <br />
          <input type='text' placeholder='User Name' onChange={this.changeInput} name='username'></input>
          <br />
          <input type='password' placeholder='Password' onChange={this.changeInput} name='password'></input>
          <br />
          <input type='phone' placeholder='Phone' onChange={this.changeInput} name='phone'></input>
          <br />

          <input type='imgUrl' placeholder='imgUrl' onChange={this.changeInput} name='imgUrl'></input>
          <br />
          <input type='email' placeholder='email' onChange={this.changeInput} name='email'></input>
          <br />

          <button className="btn-lg btn-action" onClick={this.onSignup}>sign-up</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  signup,
};

export default connect(null, mapDispatchToProps)(Singup);
