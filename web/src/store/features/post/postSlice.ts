import { Post } from '@/types/Post';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
  posts: Post[] | null
  userPosts: Post[] | null
}

const initialState: PostsState = {
  posts: null,
  userPosts: null
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    clearPosts: (state) => {
      state.posts = null;
    },
    setUserPosts: (state, action: PayloadAction<Post[]>) => {
      state.userPosts = action.payload;
    },
    clearUserPosts: (state) => {
      state.userPosts = null;
    },
  },
});

export const { setPosts, clearPosts, setUserPosts, clearUserPosts } = postsSlice.actions;

export default postsSlice.reducer;
