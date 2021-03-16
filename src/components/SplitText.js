import React from "react";
import { Tween, SplitChars } from 'react-gsap';
import PropTypes from "prop-types";


export const SplitText = ({ text, duration, stagger, from }) => {
    return (
        <div className="letters">
            <Tween
                from={from}
                duration={duration}
                stagger={stagger}
            >
                <SplitChars
                    wrapper={<div className="letter" />}
                >
                    {text}
                </SplitChars>
            </Tween>
        </div>
    )
};

SplitText.propTypes = {
    text: PropTypes.string,
    duration: PropTypes.number,
    stagger: PropTypes.number,
    from: PropTypes.object,
};
