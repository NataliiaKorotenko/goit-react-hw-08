export const selectAuthIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectAuthError = (state) => state.auth.error;
export const selectError = (state) => state.contacts.error;

