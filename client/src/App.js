import React, { useEffect, useState } from "react"
import { Switch, Route, useHistory } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from './pages/Login'
import RegisterForm from './components/RegisterForm'
import LevelOne from "./components/levels/LevelOne"
import LevelTwo from "./components/levels/LevelTwo"
import LevelThree from "./components/levels/LevelThree"
import LevelFour from "./components/levels/LevelFour"
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [loginError, setLoginError] = useState("")
  const history = useHistory()

  useEffect(() => {
    fetch('http:localhost:3001/me')
    .then(response => {
      if(response.ok) {
        response.json()
        .then( user => {
          setLoggedIn(true)
          setUser(user)

        })
      }
    })
  }, [])

  const LoginUser= (u) => {
    setLoggedIn(true)
    setUser(u)
    history.push('/')
  }

  const logoutUser = () => {
    fetch('http:localhost:3001/logout', {method: 'DELETE'})
    .then(() => {
      console.log('logged out')
      setLoggedIn(false)
      setUser({})
    }) 
    history.push('/')
  }


  return (
    <div className="App">
    

      <Switch>
        <Route exact path="/" render={routerProps => <Dashboard {...routerProps} loginUser={LoginUser} loggedIn={loggedIn} user={user} />}/>

        <Route exact path="/register" render={routerProps => <RegisterForm {...routerProps} loginUser={LoginUser}/>}/>

        <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={LoginUser} />}/>

        <Route path="level-one/" render={routerProps => <LevelOne {...routerProps} loginUser={LoginUser} />}/>

        <Route path="level-two/" render={routerProps => <LevelTwo {...routerProps} loginUser={LoginUser} />}/>

        <Route path="level-three/" render={routerProps => <LevelThree {...routerProps} loginUser={LoginUser} />}/>

        <Route path="level-four/" render={routerProps => <LevelFour {...routerProps} loginUser={LoginUser} />}/>

      </Switch>
    </div>
    );
  }

export default App;
