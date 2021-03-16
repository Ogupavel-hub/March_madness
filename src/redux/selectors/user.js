export const selectUser = state => state.user.response;
export const selectUserSelection = state => state.user.response && state.user.response.fields["Selected Players"];
