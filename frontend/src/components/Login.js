import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { login } from '../actions/UserActions';

import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { Button } from '@material-ui/core';


class Login extends Component {
  state = {
    email: '',
    password: '',
    isHide: true
  };

  changeInput = ev => {
    let field = ev.target.name;
    let value = ev.target.value;
    this.setState({ [field]: value });
  };

  onLogInUser = async () => {
    const email = this.state.email;
    const password = this.state.password;
    const user = { email, password };

    await this.props.login(user);
    this.props.history.push(`/`);


  };
  changeForm = () => {
    this.setState(prevState => ({ isHide: !prevState.isHide }))
  }

  render() {
    const hideSignup = (this.state.isHide) ? 'hide' : 'show-block'
    const hideLogIn = (!this.state.isHide) ? 'hide' : 'show-block'
    return (
      <div className="flex column align-center justify-center">
        {/* <Navbar styleNavBar={styleNavBar} ></Navbar> */}
      <div>Log-in</div>
        <div className={hideLogIn}>
          <div> <input name="email" onChange={this.changeInput} value={this.state.email} type="text" className="login-input" placeholder=" email"></input></div>
          <div> <input name="password" onChange={this.changeInput} value={this.state.password} type="password" className="login-input" placeholder=" Password"></input></div>
          <div className="login-btns-warpper">
            <div className="btn-container">
              <button className="btn-lg btn-action" onClick={this.onLogInUser} >Login</button>
            </div>

          </div>
        </div>
        <div className={hideSignup}>

          <Signup ></Signup>
        </div>
        <span className="cursor-pointer" onClick={this.changeForm}>If you are not registered click here to register</span>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
