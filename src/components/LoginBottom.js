import React from "react";
import { useSelector } from "react-redux";
import { Expo } from "gsap";
import { Tween } from 'react-gsap';

import { createMarkup } from "src/utils";


const delay = 1.4;

export const LoginBottom = () => {
    const content = useSelector(state => state.content);

    return (
        <div className="login-bottom-wrapper">
            <Tween
                from={{
                    opacity: 0,
                    delay: delay,
                    easing: Expo.easeOut
                }}
                duration={0.8}
            >
                <div className="login-consent center-text"
                     dangerouslySetInnerHTML={createMarkup(content.login_consent)} />
            </Tween>
        </div>
    )
};
