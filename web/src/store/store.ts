import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import postsReducer from './features/post/postSlice';
import tagsReducer from './features/tag/tagSlice';
import imageReducer from './features/image/imageSlice';
import analyticsReducer from './features/analytic/analyticSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    tags: tagsReducer,
    images: imageReducer,
    analytics: analyticsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
