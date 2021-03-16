import React from "react";
import { useSelector } from "react-redux";
import { Quint } from 'gsap';

import { SplitText } from "./SplitText";


export const LoginLabel = () => {
    const content = useSelector(state => state.content);

    return (
        <div className="head-label-wrapper">
            <div className="container">
                <div className="head-label center-text">
                    <SplitText
                        text={content.login_label}
                        duration={0.65}
                        stagger={0.05}
                        from={{
                            x: function(index, target, targets) {
                                return -1 * target.offsetLeft;
                            },
                            opacity: 0,
                            ease: Quint.easeOut
                        }}/>
                </div>
            </div>
        </div>
    )
};
