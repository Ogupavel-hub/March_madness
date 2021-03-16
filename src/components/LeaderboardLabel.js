import React from "react";
import { Quint } from 'gsap';

import { SplitText } from "./SplitText";


export const LeaderboardLabel = ({ label }) => {
    return (
        <div className="leaderboard-label">
            <SplitText
                text={label}
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
    )
};
