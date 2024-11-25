import { Image } from '@/types/Image';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
  image: Image | null
  images: Image[] | null
  userImages: Image[] | null
}

const initialState: ImageState = {
  image: null,
  images: null,
  userImages: null
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<Image>) => {
      state.image = action.payload;
    },
    setImages: (state, action: PayloadAction<Image[]>) => {
      state.images = action.payload;
    },
    clearImage: (state) => {
      state.image = null;
    },
    setUserImages: (state, action: PayloadAction<Image[]>) => {
      state.userImages = action.payload;
    },
    clearUserImage: (state) => {
      state.userImages = null;
    },
  },
});

export const { setImage, setImages, clearImage, setUserImages, clearUserImage } = imageSlice.actions;

export default imageSlice.reducer;
