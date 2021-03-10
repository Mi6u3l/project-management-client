import './App.scss';
import ListProjects from './components/ListProjects';
import ProjectDetails from './components/ProjectDetails';
import EditProject from './components/EditProject';
import { AddProject } from './components/AddProject';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { loggedin } from './api';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import { LoggedUserProvider } from './context/loggedUser'

export const App = () => {
  const [loggedInUser, setLoggedInUser] = useState();

  const setCurrentUser = (user) => {
    setLoggedInUser(user)
  }

  useEffect(() => {
    if (!loggedInUser) {
      //Check if the user session is still active on the server
      loggedin()
        .then((response) => {
          if (response.data._id) {
            //there's an active user session on the server
            setCurrentUser(response.data)
          }
        })
    }
  }, []);
  
  return (
    <div className="App">
      <LoggedUserProvider value={'todo'}>
        <ToastContainer />
        <NavBar loggedInUser={loggedInUser} setCurrentUser={setCurrentUser} />
        <Switch>
          <Route exact path={["/", "/projects"]} component={ListProjects} />
          {/* <Route exact path="/projects/add" component={AddProject} /> */}
          <PrivateRoute exact path="/projects/add" component={AddProject} />
          <Route exact path="/projects/:id" component={ProjectDetails} />
          <Route exact path="/projects/:id/edit" component={EditProject} />            
          <Route exact path="/login" render={
            (props) => {
              return <Login {...props} setCurrentUser={setCurrentUser} />
            }
          } />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login-google" render={
            () => {
              window.location.href = 
              `${process.env.REACT_APP_PROJECTS_API}/api/auth/google`
            }
          }/>
        </Switch>
        </LoggedUserProvider>
    </div>
  );
}