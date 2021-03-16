import React from "react";
import { Sine } from "gsap";
import { Tween } from 'react-gsap';

import { createMarkup } from "src/utils";


export const EmptyText = ({ text }) => {
    return (
        <Tween
            from={{
                opacity: 0,
                y: 220,
                easing: Sine.easeOut
            }}
            duration={0.8}
        >
            <div className="empty-label text-markdown"
                 dangerouslySetInnerHTML={createMarkup(text)} />
        </Tween>
    )
};
