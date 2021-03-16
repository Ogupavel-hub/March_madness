import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated as isUserAuthenticated } from "src/storage";
import { RoutesNames } from "src/constants";


export const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = isUserAuthenticated();

    return (
        <Route
            {...rest}
            render={props => {
                return (
                    !isAuthenticated ? (
                        <Redirect to={{
                            pathname: RoutesNames.login,
                            state: { from: props.location }
                        }}/>
                    ) : <Component {...props}/>
                );
            }}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    redirect: PropTypes.string,
};
