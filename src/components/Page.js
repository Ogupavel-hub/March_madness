import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
    showPreloader,
    hidePreloader,
    loadContent,
    loadUser,
    logoutUser,
    initAppSuccess
} from "src/redux/actions";
import { selectAppIsInitialized } from "src/redux/selectors";
import { getUser, isAuthenticated as isUserAuthenticated } from "src/storage";
import { NavLinks } from "src/components/NavLinks";
import { Menu } from "src/components/Menu";


export const Page = (props) => {
    const dispatch = useDispatch();
    const content = useSelector(state => state.content);
    const appIsInitialized = useSelector(selectAppIsInitialized);
    const { isLoading: userIsLoading } = useSelector(state => state.user);
    const isAuthenticated = isUserAuthenticated();
    const isLoading = content.isLoading || userIsLoading;

    useEffect(() => {
        if (appIsInitialized) return;

        async function fetchData() {
            let jobs = [];

            if (!content.response) {
                dispatch(showPreloader());
                jobs.push(dispatch(loadContent()));
            }

            // load user if exists in LS
            if (isAuthenticated) {
                jobs.push(dispatch(
                    loadUser(getUser())
                ).catch(
                    (error) => {
                        // if the user has been removed from airtable
                        dispatch(logoutUser());
                    }
                ));
            }

            return await Promise.all(jobs);
        }

        fetchData().then((data) => {
            dispatch(initAppSuccess());

            if (props.isPageLoaded) {
                dispatch(hidePreloader());
            }
        });
    }, [appIsInitialized]);

    const navs = <NavLinks isAuthenticated={isAuthenticated} pathname={props.pathname} />;

    return (
        <div id="app-page">
            <main id="app-main" className={props.className}>
                {isLoading || !content.response ? null : props.children}

                {navs && <Menu children={navs} />}
            </main>
        </div>
    );
};

Page.propTypes = {
    pathname: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    isPageLoaded: PropTypes.bool
};

Page.defaultProps = {
  isPageLoaded: true
};
