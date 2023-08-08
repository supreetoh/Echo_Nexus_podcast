import { createReducer } from '@reduxjs/toolkit';

export const podcastReducer = createReducer({}, (builder) => {
  builder
    .addCase('GET_TRENDING_PODCASTS_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('GET_PODCASTS_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('GET_PODCAST_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('UPDATE_VIEWS_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('UPLOAD_PODCAST_REQUEST', (state) => {
      state.loading = true;
    });
  builder
    .addCase('GET_TRENDING_PODCASTS_SUCCESS', (state, action) => {
      state.loading = false;
      state.trending = action.payload;
      state.message = action.payload;
    })
    .addCase('GET_PODCASTS_SUCCESS', (state, action) => {
      state.loading = false;
      state.filteredPodcasts = action.payload;
      state.user = action.payload;
    })
    .addCase('GET_PODCAST_SUCCESS', (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.user = null;
    })
    .addCase('UPDATE_VIEWS_SUCCESS', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('UPLOAD_PODCAST_SUCCESS', (state, action) => {
      state.loading = false;
      state.podcast = action.payload;
      state.message = action.payload;
    });
  builder
    .addCase('GET_TRENDING_PODCASTS_FAIL', (state, action) => {
      state.loading = false;
      state.trending = null;
      state.error = action.payload;
    })
    .addCase('GET_PODCASTS_FAIL', (state, action) => {
      state.loading = false;
      state.filteredPodcasts = null;
      state.error = action.payload;
    })
    .addCase('GET_PODCAST_FAIL', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('UPDATE_VIEWS_FAIL', (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload;
    })
    .addCase('UPLOAD_PODCAST_FAIL', (state, action) => {
      state.loading = false;
      state.podcast = null;
      state.error = action.payload;
    });

  builder.addCase('clearError', (state) => {
    state.error = null;
  });
  builder.addCase('clearMessage', (state) => {
    state.message = null;
  });
});
