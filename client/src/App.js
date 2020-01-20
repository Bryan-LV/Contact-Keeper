import React from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home'
import About from './components/pages/About'
import {Route, Switch} from 'react-router-dom'
import ContactContext from './context/contact/contactContext';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import './App.css';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <ContactContext>
          <div className="App container-fluid">
            <Navbar />
            <Alerts/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </ContactContext>
      </AlertState>
    </AuthState>
  );
}

export default App;
