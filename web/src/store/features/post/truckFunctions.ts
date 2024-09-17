import { AppDispatch } from '../../store';
import { api } from '@/services/api';
import { setPosts } from './postSlice';
import { parseCookies } from 'nookies';
import { createPostType } from '@/pages/dashboard/admin/post/create-post';

export const fetchPostsList = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get('/posts')
    
    const postsData = response.data
    dispatch(setPosts(postsData));
  } catch (error) {
    console.error('Failed to fetch truck data:', error);
  }
};

export const createPost = (data: createPostType) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.post(`/posts`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao criar post:', error);
      });
    return true
  } catch (error) {
    console.error('Failed createPost:', error);
    return false
  }
};

export const deletePost = (id: number) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.delete(`/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao deletar post:', error);
      });
    return true
  } catch (error) {
    console.error('Failed deletePost:', error);
    return false
  }
};
