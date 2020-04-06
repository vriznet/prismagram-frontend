import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Auth from '../Routes/Auth';
import Feed from '../Routes/Feed';

const LoggedInRoutes = () => (
  <React.Fragment>
    <Route exact path="/" component={Feed} />
  </React.Fragment>
);

const LoggedOutRoutes = () => (
  <React.Fragment>
    <Route exact path="/" component={Auth} />
  </React.Fragment>
);

const AppRouter = ({ isLoggedIn }) => (
  <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
