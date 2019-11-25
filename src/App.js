import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/navbar/Navbar.js';
import Signup from './components/auth/Signup';
import AuthService from './services/auth/auth-service';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    }
    this.service = new AuthService();
    // this.fetchUser = this.fetchUser.bind(this);
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser();
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} exact path='/home' component={Home} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path='/' render={() => <Login getUser={this.getTheUser} />} />
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
            <ProtectedRoute user={this.state.loggedInUser} exact path='/home' component={Home} />
          </Switch>
        </div>
      );
    }
  }
}

export default App;