import { selectUserSelection } from './user';

export const selectIsPlayersLoading = state => state.players.isLoading;
export const selectPlayers = state => state.players.players;
export const selectPlayersByUser = state => {
    const players = selectPlayers(state);
    const userSelection = selectUserSelection(state);

    if (!userSelection || !userSelection.length) {
        return []
    }

    return players.filter(player => userSelection.includes(player.id))
};
