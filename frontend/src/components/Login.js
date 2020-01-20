import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {login} from '../actions/UserActions'
import UserService from '../services/UserService'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export class Login extends Component {


    state = {
        modalIsOpen: false,
        email:'',
        password:''
    };

    openModal = this.openModal.bind(this);
    afterOpenModal = this.afterOpenModal.bind(this);
    closeModal = this.closeModal.bind(this);


    changeInput = (ev) => {


        let field = ev.target.name;
        let value = ev.target.value;
        this.setState( ({  [field]: value  }))
        // this.props.onFilter(this.state.filterBy)
    
      }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    onLogin = ()=>{

        const email = this.state.email
        const password = this.state.password
        const user = {email,password}
        
        this.props.login(user)
        
       var interval = setInterval(() => {
           const checkLogIn = UserService.checkConnection()
           console.log('$$$$$$$$',checkLogIn);
            if(checkLogIn){
                this.closeModal()
                clearInterval(interval)
                this.props.onLogIn()
            }
            
        }, 1000);
    }

    render() {
        
        return <div>
            <a onClick={this.openModal}>
              Log-in |
              </a>
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={subtitle => this.subtitle = subtitle}>Log in </h2>
               <div className="log-in">
                    <p>User-Name</p>
                    <input type="email" placeholder="email"
                        onChange={this.changeInput} name="email"></input>
                    <p>Password</p>
                    <input type="text" placeholder="password"
                        onChange={this.changeInput} name="password"></input>
                    <br />
                    <button onClick={this.onLogin}>Log-in</button>
                </div>
                
                    <button onClick={this.closeModal}>close</button>

            </Modal>
        </div>
    }
}

const mapDispatchToProps = {
    login
  };
  
export default connect(null, mapDispatchToProps)(Login);