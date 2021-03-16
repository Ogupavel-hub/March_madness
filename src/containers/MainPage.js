import sortBy from 'lodash/sortBy';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Page } from "src/components/Page";
import { MainList } from "src/components/MainList";
import { MainSelected } from "src/components/MainSelected";
import { EmptyText } from "src/components/EmptyText";
import { showPreloader, hidePreloader, loadPlayers } from "src/redux/actions";
import { LOAD_PLAYERS_FULFILLED } from "src/redux/constants";
import {
    selectAppIsInitialized,
    selectIsPlayersLoading,
    selectEnableSelection,
    selectUserSelection,
    selectPlayers
} from "src/redux/selectors";


export const MainPage = (props) => {
    const dispatch = useDispatch();
    const content = useSelector(state => state.content);
    const enableSelection = useSelector(selectEnableSelection);
    const appIsInitialized = useSelector(selectAppIsInitialized);

    const players = useSelector(selectPlayers);
    const hasPlayers = Boolean(players.length);
    const { isPlayersLoading } = useSelector(selectIsPlayersLoading);

    const userSelection = useSelector(selectUserSelection);
    const hasSelected = userSelection && Boolean(userSelection.length);

    useEffect(() => {
        if (!appIsInitialized || (!hasSelected && !enableSelection)) return;

        if (!hasPlayers) {
            dispatch(showPreloader());
            dispatch(
                loadPlayers(userSelection)
            ).then(
                ({ value, action }) => {
                    if (action && action.type === LOAD_PLAYERS_FULFILLED) {
                        dispatch(hidePreloader());
                    }
                }, (error) => {}
            );
        }
    }, [appIsInitialized]);

    return (
        <Page pathname={props.location.pathname}
              className="main-page"
              isPageLoaded={hasPlayers || !enableSelection}
        >
            <div className="container">
                {enableSelection || hasSelected ?
                    ((hasPlayers && !isPlayersLoading) && (
                        hasSelected ?
                            <MainSelected players={sortBy(players.filter(player => userSelection.includes(player.id)),
                                                         'tier')} />
                            :
                            <MainList players={players} />
                    ))
                    :
                    <EmptyText text={content.main_empty} />}
            </div>
        </Page>
    );
};
