import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthServices from '../../services/AuthServices';

const RestrictedRoutes = ({component: Component, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            AuthServices.isLogin() ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default RestrictedRoutes;