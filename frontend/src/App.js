import React from 'react';
import { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from './pages/Home';
import MealApp from './pages/MealApp';
import MealDetails from './pages/MealDetails';
import UserDetails from './pages/UserDetails';
import MealFormWrapper from './pages/MealFormWrapper';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';

import './assets/css/all.min.css';
import './assets/styles/global.scss';

const history = createBrowserHistory();

export default class App extends Component {
  render() {
    return (
      <React.Fragment >
        <Router history={history}>
            <Header></Header>
            <Switch>
              <Route component={Home} path='/' exact></Route>
              <Route component={MealFormWrapper} path='/meal/edit/:id?'></Route>
              <Route component={MealApp} path='/meal/location/:location?'></Route>
              <Route component={MealApp} path='/meal/cuisine/:cuisine?'></Route>
              <Route component={MealApp} path='/meal/results/:results?'></Route>
              <Route component={Login} path='/user/login' exact></Route>
              {/* <Route component={Signup} path='/user/signup' exact></Route> */}
              <Route component={MealDetails} path='/meal/:id' exact></Route>
              <Route component={UserDetails} path='/user/:id' exact></Route>
            </Switch>
            <Footer></Footer>
        </Router>
      </React.Fragment>
    );
  }
}
