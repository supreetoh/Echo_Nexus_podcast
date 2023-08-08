import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../reducers/userReducer.js';
import { podcastReducer } from '../reducers/podcastReducer.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    podcast: podcastReducer,
  },
});

export default store;
