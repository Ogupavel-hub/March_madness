import find from 'lodash/find';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tween } from 'react-gsap';
import { useDispatch, useSelector } from "react-redux";
import SwiperCore, { Navigation, Pagination, Lazy, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { UPDATE_USER_FULFILLED } from "src/redux/constants";
import { showPreloader, hidePreloader, updateUser } from "src/redux/actions";
import { createMarkup } from "src/utils";


SwiperCore.use([Navigation, Pagination, Lazy, EffectFade]);


export const MainList = ({ players }) => {
    const dispatch = useDispatch();
    const content = useSelector(state => state.content);
    const groups = groupBy(players, 'tier');

    const [selectedCards, setSelectedCards] = useState({});
    const isTierSelected = (tier) => selectedCards[tier];

    const tiers = Object.keys(groups).sort();
    const isFullSet = () => tiers.filter(group => selectedCards[group]).length === tiers.length;

    const handleCardClick = (group, id) => {
        if (selectedCards[group] === id) {
            setSelectedCards({
                ...selectedCards,
                [group]: undefined
            });
            return
        }

        setSelectedCards({
            ...selectedCards,
            [group]: id
        });
    };

    const handleSubmitClick = (event) => {
        dispatch(showPreloader());

        const ids = tiers.map(group => selectedCards[group]);
        dispatch(updateUser({
            'Selected Players': ids
        })).then(
            ({value, action}) => {
                if (action && action.type === UPDATE_USER_FULFILLED) {
                    dispatch(hidePreloader());
                }
            }, (error) => {});
    };

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
                         dangerouslySetInnerHTML={createMarkup(content.main_selection_rules)} />
                </Tween>
            </div>

            <Swiper
                spaceBetween={40}
                effect="fade"
                // fadeEffect={{ crossFade: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    el: '.swiper-pagination',
                    renderBullet: function (index, className) {
                        return `<div class="${className}">
                                  ${index + 1}
                                </div>`;
                    },
                    clickable: true
                }}
                lazy
            >
                {sortBy(Object.entries(groups), [o => o[0]]).map(([group, cards], i) => {
                    return (
                        <SwiperSlide key={group}>
                            <div className="tier" />
                            <div className="list">
                                {cards.map((card, i) => {
                                    let classes = 'card';
                                    if (selectedCards[group] === card.id) classes += ' selected';
                                    else if (isTierSelected(group)) classes += ' skipped';

                                    return (
                                        <div className="list-item" key={card.id}>
                                            <div className={classes} onClick={() => handleCardClick(group, card.id)}>
                                                <div className="card-image-wrapper">
                                                    <img className="card-image swiper-lazy"
                                                         data-src={card.image_url}
                                                         alt={card.name} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>

            <div className="swiper-ui">
                <div className="swiper-navigation">
                    <div className="swiper-button-prev" />
                    <div className="swiper-button-next" />
                </div>

                <div className="swiper-pagination" />
            </div>

            <div className="bottom text-block">
                <div className="list list-thumbs">
                    {tiers.map((tier, i) => {
                        const selectedId = selectedCards[tier];
                        const card = find(groups[tier], { id: selectedId });

                        return (
                            <div className="thumb-list-item" key={tier}>
                                <div className="thumb-list-item-tier">{i + 1}</div>

                                {card ?
                                    <div className="card thumb-list-item-card">
                                        <div className="card-image-wrapper">
                                            <img className="card-image"
                                                 src={card.image_url}
                                                 alt={card.name} />
                                        </div>
                                    </div>
                                    :
                                    <div className="thumb-list-item-placeholder" />}
                            </div>
                        )
                    })}
                </div>

                <Tween
                    from={{
                        opacity: 0,
                        x: 270,
                        rotationX: -180,
                        rotationY: -210,
                        rotationZ: -90,
                        delay: 0.4
                    }}
                    duration={0.8}
                    ease="elastic.out(0.2, 0.1)"
                >
                    <button type="button"
                            className="btn btn-green"
                            onClick={handleSubmitClick}
                            disabled={!isFullSet()}>
                        <span className="btn-text">{"submit"}</span>
                    </button>
                </Tween>
            </div>
        </>
    )
};

MainList.propTypes = {
    players: PropTypes.array.isRequired
};
