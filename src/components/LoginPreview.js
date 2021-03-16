import React from "react";
import { useSelector } from "react-redux";
import { Expo } from 'gsap';
import { Tween } from 'react-gsap';

import preview from "src/images/preview.png";


const delay = 0.7;

export const LoginPreview = () => {
    const content = useSelector(state => state.content);

    return (
        <div className="login-preview-wrapper">
            <Tween
                from={{
                    opacity: 0,
                    delay: delay,
                    easing: Expo.easeOut
                }}
                duration={1.2}
            >
                <div className="login-preview">
                    <img className="login-preview-img"
                         src={preview}
                         alt="preview"/>
                </div>
            </Tween>

            <Tween
                from={{
                    opacity: 0,
                    delay: delay + 0.2
                }}
                duration={1.2}
            >
                <div className="login-preview-label center-text">
                    {content.login_text}
                </div>
            </Tween>
        </div>
    )
};
