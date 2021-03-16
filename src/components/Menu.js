import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';


export const Menu = ({ children }) => {
    const [hideOnScroll, setHideOnScroll] = useState(true);

    useScrollPosition(
        ({ prevPos, currPos }) => {
            const isShow = currPos.y > prevPos.y
            if (isShow !== hideOnScroll) setHideOnScroll(isShow);
        },
        [hideOnScroll]
    )

    return (
        <div className={hideOnScroll ? "menu show" : "menu"}>
            {children}
        </div>
    )
};

Menu.propTypes = {
    children: PropTypes.element.isRequired
};
