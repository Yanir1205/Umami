import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { signup } from '../actions/UserActions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

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

  openModal = this.openModal.bind(this);
  afterOpenModal = this.afterOpenModal.bind(this);
  closeModal = this.closeModal.bind(this);

  changeInput = ev => {
    let field = ev.target.name;
    let value = ev.target.value;
    this.setState({ [field]: value });
    // this.props.onFilter(this.state.filterBy)
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now synced and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onSignup = () => {
    const user = this.state;
    delete user.modalIsOpen;

    this.props.signup(user);
  };

  render() {
    return (
      <div>
        <a onClick={this.openModal}>signup</a>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel='Example Modal'>
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Log in </h2>
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

            <button onClick={this.onSignup}>sign-up</button>
          </div>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = {
  signup,
};

export default connect(null, mapDispatchToProps)(Singup);
