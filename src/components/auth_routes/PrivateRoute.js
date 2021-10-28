import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthServices from '../../services/AuthServices';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            AuthServices.isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;