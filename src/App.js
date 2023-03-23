import React, { useEffect, lazy, Suspense } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import LoadingSpinner from './shared/UIElements/LoadingSpinner';
import Launches from './components/launches/Launches';
import NavBar from './components/navbar/NavBar';
import Users from './components/users/Users';
import UserItem from './components/users/UserItem';
import Auth from './components/auth/Auth';
import UserMyWatchlist from './components/users/UserMyWatchlist';

import { initializeLaunches } from "./reducers/launchesReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { autoLoginUser, logoutUser } from './reducers/authReducer';
import { useDispatch, useSelector } from "react-redux";

const Home = lazy(() => import('./components/Home'));
const LaunchItem = lazy(() => import('./components/launches/LaunchItem'));


function App() {
  const dispatch = useDispatch();
  const launches = useSelector((state) => state.launches);
  const authState = useSelector((state => state.auth));
  const users = useSelector((state => state.users));

  useEffect(() => {
    dispatch(initializeLaunches());
    dispatch(autoLoginUser())
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [authState])
  
  useEffect(() => {
    if(authState.token && authState.tokenExpirationDate) {
      const remainingTime = new Date(authState.tokenExpirationDate).getTime() - new Date().getTime()
      
      if(remainingTime >= 0) {
        const timer = setTimeout(() => {
          console.log('This will logout!')
          dispatch(logoutUser())
        }, remainingTime)
        return () => clearTimeout(timer);
      } 
    }
  }, [authState, users])

  let routes;

  if(authState.token) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/pastLaunches">
          {(launches.length <= 0) ? 
            <div className="l">
              <LoadingSpinner />
            </div> : 
            <Launches />}
        </Route>
        <Route exact path="/pastLaunch/:lid/:userId">
          <LaunchItem />
        </Route>
        <Route exact path="/api/users">
          <Users />
        </Route>
        <Route exact path="/api/users/user/:userId">
          <UserItem />
        </Route>
        <Route exact path="/mywatchlist/:userId">
          <UserMyWatchlist />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/pastLaunches">
          {(launches.length <= 0) ? 
            <div className="l">
              <LoadingSpinner />
            </div> : 
            <Launches />}
        </Route>
        <Route exact path="/pastLaunch/:lid">
          <LaunchItem />
        </Route>
        <Route exact path="/api/users">
          <Users />
        </Route>
        <Route exact path="/api/users/user/:userId">
          <UserItem />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    )
  }

  return (
    <Router>
      <NavBar />
      <main> 
        <Suspense fallback={<LoadingSpinner asOverlay />}>
          {routes}
        </Suspense>
      </main>
    </Router>
  );
};

export default App;