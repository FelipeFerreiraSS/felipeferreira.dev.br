import { Post } from '@/types/Post';
import { User } from '@/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Users extends User {
  posts: Post[]
}

interface UserState {
  user: User | null
  users: Users[] | null
}

const initialState: UserState = {
  user: null,
  users: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUsers: (state, action: PayloadAction<Users[]>) => {
      state.users = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setUsers, clearUser } = userSlice.actions;

export default userSlice.reducer;
