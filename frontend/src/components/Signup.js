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
    if (user.fullName && user.username && user.password && user.email && user.phone && user.imgUrl) {
      this.props.signup(user);
    }
  };

  onCheckForm = (ev) => {
    if (ev.key === 'Enter') this.onSignup()
  }

  render() {
    return (
      <div>
        <a onClick={this.openModal}>signup</a>
        <div className='log-in' onKeyUp={(ev) => this.onCheckForm(ev)}>
          <input type='text' className='margin-top-10' placeholder='Full Name' onChange={this.changeInput} name='fullName'></input>
          <br />
          <input type='text' className='margin-top-10' placeholder='User Name' onChange={this.changeInput} name='username'></input>
          <br />
          <input type='password' className='margin-top-10' placeholder='Password' onChange={this.changeInput} name='password'></input>
          <br />
          <input type='phone' className='margin-top-10' placeholder='Phone' onChange={this.changeInput} name='phone'></input>
          <br />

          <input type='imgUrl' className='margin-top-10' placeholder='imgUrl' onChange={this.changeInput} name='imgUrl'></input>
          <br />
          <input type='email' className='margin-top-10' placeholder='email' onChange={this.changeInput} name='email'></input>
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
