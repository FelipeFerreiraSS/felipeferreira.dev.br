import { AppDispatch } from '../../store';
import { api } from '@/services/api';
import { setPosts } from './postSlice';

export const fetchPostsList = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get('/posts')
    
    const postsData = response.data
    dispatch(setPosts(postsData));
  } catch (error) {
    console.error('Failed to fetch truck data:', error);
  }
};
