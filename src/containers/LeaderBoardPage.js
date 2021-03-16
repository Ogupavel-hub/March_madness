import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Page } from "src/components/Page";
import { LeaderboardLabel } from "src/components/LeaderboardLabel";
import { LeaderboardRow } from "src/components/LeaderboardRow";
import { EmptyText } from "src/components/EmptyText";
import { showPreloader, hidePreloader, loadUsers } from "src/redux/actions";
import {
    selectAppIsInitialized,
    selectIsUsersLoading,
    selectUsers,
    selectUser,
    selectUserSelection
} from "src/redux/selectors";
import { LOAD_USERS_FULFILLED } from "src/redux/constants";


export const LeaderBoardPage = (props) => {
    const dispatch = useDispatch();
    const content = useSelector(state => state.content);
    const appIsInitialized = useSelector(selectAppIsInitialized);

    const currentUser = useSelector(selectUser);
    const users = useSelector(selectUsers);
    const hasUsers = Boolean(users.length);
    const { isUsersLoading } = useSelector(selectIsUsersLoading);
    const userSelection = useSelector(selectUserSelection);
    const hasSelected = userSelection && Boolean(userSelection.length);

    useEffect(() => {
        if (!appIsInitialized || isUsersLoading) return;

        dispatch(showPreloader());
        dispatch(
            loadUsers({
                filterByFormula: "NOT(OR(_has_place=''))",
                sort: [{
                    field: "Place",
                    // field: 'Summary Score',
                    direction: 'asc'
                }],
                maxRecords: 10
            })
        ).then(
            ({ value, action }) => {
                if (action && action.type === LOAD_USERS_FULFILLED) {
                    dispatch(hidePreloader());
                }
            }, (error) => {}
        );
    }, [appIsInitialized]);

    const userInTopTen = Boolean(currentUser) && users.map(u => u.id).includes(currentUser.id);

    return (
        <Page pathname={props.location.pathname}
              className="leaderboard-page"
              isPageLoaded={false}
        >
            <div className="container">
                {hasUsers ?
                    <>
                        <LeaderboardLabel label={content.leaderboard_label} />

                        <div className="leaderboard-table">
                            {(hasSelected && !userInTopTen) &&
                            <LeaderboardRow key={currentUser.id}
                                            className={"single current"}
                                            user={currentUser}
                            />}

                            {users.map((user, i) =>
                                <LeaderboardRow
                                    key={user.id}
                                    className={(userInTopTen && currentUser.id === user.id) ? "current" : ""}
                                    user={user}
                                />)}
                        </div>
                    </>
                    :
                    isUsersLoading ? null : <EmptyText text={content.leaderboard_empty} />
                }
            </div>
        </Page>
    );
};
