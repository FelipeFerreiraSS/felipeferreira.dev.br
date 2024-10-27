import { Analytics } from '@/types/Analytic';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticState {
  analytics: Analytics | null
}

const initialState: AnalyticState = {
  analytics: {
    message: '',
    postsPublished: 0,
    postsDraft: 0,
    tags: 0,
    topAuthor: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      profileImageUrl: '',
      type: '',
      postsPublished: 0
    },
    images: 0,
    mostRecentPost: {
      id: 0,
      title: '',
      summary: '',
      createdAt: new Date(),
      headerImage: { id: 0, imageUrl: '' },
      updatedAt: '',
      readTime: '',
      tags: [{ id: 0, name: '' }],
      author: { firstName: '', lastName: '' }
    },
    averageReadTime: '0:00',
    postsPerTag: [],
    postsByMonth: []
  }
};

const AnalyticSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalytics: (state, action: PayloadAction<Analytics>) => {
      state.analytics = action.payload;
    },
    clearAnalytics: (state) => {
      state.analytics = {
        message: '',
        postsPublished: 0,
        postsDraft: 0,
        tags: 0,
        topAuthor: {
          id: 0,
          firstName: '',
          lastName: '',
          email: '',
          profileImageUrl: '',
          type: '',
          postsPublished: 0
        },
        images: 0,
        mostRecentPost: {
          id: 0,
          title: '',
          summary: '',
          createdAt: new Date(),
          headerImage: { id: 0, imageUrl: '' },
          updatedAt: '',
          readTime: '',
          tags: [{ id: 0, name: '' }],
          author: { firstName: '', lastName: '' }
        },
        averageReadTime: '0:00',
        postsPerTag: [],
        postsByMonth: []
      }
    },
  },
});

export const { setAnalytics, clearAnalytics } = AnalyticSlice.actions;

export default AnalyticSlice.reducer;
