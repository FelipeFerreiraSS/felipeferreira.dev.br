import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import postsReducer from './features/post/postSlice';
import tagsReducer from './features/tag/tagSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    tags: tagsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
