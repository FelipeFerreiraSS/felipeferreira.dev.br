import { Post } from '@/types/Post';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
  posts: Post[] | null
}

const initialState: PostsState = {
  posts: null
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
  },
});

export const { setPosts, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
