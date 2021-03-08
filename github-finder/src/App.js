import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Userlist from './components/user/userlist'
import User from './components/users/user'
import Search from './components/user/search'
import Alert from './components/layout/alert'
import About from './components/pages/about'
import axios from 'axios'
import './App.css';
import { BrowserRouter } from 'react-router-dom'

class App extends Component {


  state = {
    user: [],
    userdet: {},
    loading: false,
    alert: null
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => {
      this.setState({ alert: null })
    }, 1250);
  }

  searchUsers = async text => {
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/search/user?q=${text}&?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ user: res.data.items, loading: false })
  }

  getUser = async (username) => {
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ userdet: res.data, loading: false })
  }

  clearUsers = () => {
    this.setState({ user: [], loading: false })
  }

  render() {
    const { user, userdet, loading } = this.state

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={user.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Userlist loading={loading} user={user} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} userdet={userdet} loading={loading} />
              )} />
            </Switch>

          </div>
        </div>
      </Router >)
  }
}

export default App;
