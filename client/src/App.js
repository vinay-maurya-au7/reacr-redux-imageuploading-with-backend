import React from 'react';
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {userLoginHelper, userLogout} from './redux/actions/userAction'
import setAuthToken from './redux/helper/setAuthToken'
import store from './redux/store'

//Components
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import AllPosts from './pages/AllPosts'
import UploadPost from './pages/UploadPost'
import UsersPost from './pages/UsersPost'


if (window.localStorage.userJwtToken) {
  setAuthToken(localStorage.userJwtToken);
  const decoded = jwt_decode(localStorage.userJwtToken);
  store.dispatch(userLoginHelper(decoded.user))
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(userLogout());
    window.location.href = '/';
  }
}




function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/allPosts' component={AllPosts} />
          <Route exact path='/uploadPost' component={UploadPost} />
          <Route exact path='/usersPost' component={UsersPost} />
        </Switch>
      </Router>
      
  
    </div>
  );
}

export default App;
