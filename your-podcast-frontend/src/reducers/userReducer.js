import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer({}, (builder) => {
  builder
    .addCase('USER_LOGIN_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('USER_LOAD_REQUEST', (state) => {
      state.userLoading = true;
    })
    .addCase('USER_LOGOUT_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('GET_MY_FAVORITE_PODCASTS_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('USER_REGISTER_REQUEST', (state) => {
      state.loading = true;
    });
  builder
    .addCase('USER_LOGIN_SUCCESS', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload;
    })
    .addCase('USER_LOAD_SUCCESS', (state, action) => {
      state.userLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase('USER_LOGOUT_SUCCESS', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.message = action.payload;
      state.user = null;
    })
    .addCase('ADD_TO_FAVORITE_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('ADD_TO_FAVORITE_SUCCESS', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('GET_MY_FAVORITE_PODCASTS_SUCCESS', (state, action) => {
      state.loading = false;
      state.favoritePodcasts = action.payload;
    })
    .addCase('USER_REGISTER_SUCCESS', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload;
    });
  builder
    .addCase('USER_LOGIN_FAIL', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase('USER_LOAD_FAIL', (state, action) => {
      state.userLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase('USER_LOGOUT_FAIL', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    })
    .addCase('ADD_TO_FAVORITE_FAIL', (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    })
    .addCase('GET_MY_FAVORITE_PODCASTS_FAIL', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('USER_REGISTER_FAIL', (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    });

  builder.addCase('clearError', (state) => {
    state.error = null;
  });
  builder.addCase('clearMessage', (state) => {
    state.message = null;
  });
});
