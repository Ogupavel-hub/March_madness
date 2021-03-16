import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RoutesNames } from "src/constants";


export const NavLinks = ({ isAuthenticated, pathname }) => {
    switch (pathname) {
        case RoutesNames.login:
            return <Link to={RoutesNames.leaderboard}>Leaderboard</Link>
        case RoutesNames.home:
            return isAuthenticated ?
                <Link to={RoutesNames.leaderboard}>Leaderboard</Link>
                :
                null
        case RoutesNames.leaderboard:
            return isAuthenticated ?
                <Link to={RoutesNames.home}>Home</Link>
                :
                <Link to={RoutesNames.login}>Login</Link>
        default:
            return null;
    }
};

NavLinks.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
};
