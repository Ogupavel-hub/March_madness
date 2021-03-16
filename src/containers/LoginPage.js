import React from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

import { Page } from "src/components/Page";
import { LoginLabel } from "src/components/LoginLabel";
import { LoginPreview } from "src/components/LoginPreview";
import { LoginForm } from "src/components/LoginForm";
import { LoginBottom } from "src/components/LoginBottom";
import { isAuthenticated } from "src/storage";
import { RoutesNames } from "src/constants";


export const LoginPage = (props) => {
    const { from: { pathname: next = RoutesNames.home } = {} } = props.location.state || {};

    return (
        isAuthenticated() ?
            <Redirect to={next}/>
            :
            <Page pathname={props.location.pathname} className="login-page">
                <>
                    <LoginLabel />

                    <div className="login-form-wrapper">
                        <div className="container">
                            <LoginPreview />
                            <LoginForm next={next} />
                            <LoginBottom />
                        </div>
                    </div>
                </>
            </Page>
    )
};

LoginPage.propTypes = {
    location: PropTypes.object.isRequired
};
