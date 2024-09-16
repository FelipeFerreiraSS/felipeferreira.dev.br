import { Image } from '@/types/Image';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageState {
  image: Image | null
  images: Image[] | null
}

const initialState: ImageState = {
  image: null,
  images: null
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
  },
});

export const { setImage, setImages, clearImage } = imageSlice.actions;

export default imageSlice.reducer;
