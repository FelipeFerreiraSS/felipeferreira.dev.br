import { Analytics } from '@/types/Analytic';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticState {
  analytics: Analytics | null
}

const initialState: AnalyticState = {
  analytics: null
}

const AnalyticSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalytics: (state, action: PayloadAction<Analytics>) => {
      state.analytics = action.payload;
    },
    clearAnalytics: (state) => {
      state.analytics = null;
    },
  },
});

export const { setAnalytics, clearAnalytics } = AnalyticSlice.actions;

export default AnalyticSlice.reducer;
