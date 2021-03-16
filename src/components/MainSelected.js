import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Tween } from "react-gsap";

import { createMarkup } from "src/utils";


export const MainSelected = ({ players }) => {
    const content = useSelector(state => state.content);

    return (
        <>
            <div className="top text-block">
                <Tween
                    from={{
                        opacity: 0
                    }}
                    duration={1.2}
                >
                    <div className="top-label text-markdown"
                         dangerouslySetInnerHTML={createMarkup(content.main_selected_players)} />
                </Tween>
            </div>

            <div className="list selected-list">
                <Tween
                    from={{
                        opacity: 0
                    }}
                    stagger={0.2}
                >
                    {players.map((player, i) => {
                        return (
                            <div className="list-item selected-list-item" key={player.id}>
                                <div className="selected-list-item-tier">{player.tier}</div>
                                <div className="card selected-list-item-card">
                                    <div className="card-image-wrapper">
                                        <img className="card-image"
                                             src={player.image_url}
                                             alt={player.name} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Tween>
            </div>
        </>
    );
};

MainSelected.propTypes = {
    players: PropTypes.array.isRequired,
};
