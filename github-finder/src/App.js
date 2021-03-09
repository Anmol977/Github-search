import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Userlist from './components/users/userlist'
import User from './components/users/user'
import Search from './components/users/search'
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
    alert: null,
    repos: []
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => {
      this.setState({ alert: null })
    }, 1250);
  }

  getUserRepos = async username => {
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ repos: res.data, loading: false })
  }

  searchUsers = async text => {
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&?
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ user: res.data.items, loading: false })
  }

  getUser = async (username) => {
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

    this.setState({ userdet: res.data, loading: false })
  }

  clearUsers = () => {
    this.setState({ user: [], loading: false })
  }

  render() {
    const { user, userdet, repos, loading } = this.state

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
                    <Userlist loading={loading} users={user} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} userdet={userdet} loading={loading} getUserRepos={this.getUserRepos} repos={repos} />
              )} />
            </Switch>

          </div>
        </div>
      </Router >)
  }
}

export default App;
