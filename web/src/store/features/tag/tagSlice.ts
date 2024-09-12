import { Tag } from '@/types/Tag';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TagState {
  tags: Tag[] | null
}

const initialState: TagState = {
  tags: null
};

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    clearTags: (state) => {
      state.tags = null;
    },
  },
});

export const { setTags, clearTags } = tagSlice.actions;

export default tagSlice.reducer;
