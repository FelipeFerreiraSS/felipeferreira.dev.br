import { AppDispatch } from '../../store';
import { api } from '@/services/api';
import { setUserPosts, setPosts } from './postSlice';
import { parseCookies } from 'nookies';
import { CreatePostSchema } from '@/pages/dashboard/admin/post/create-post';
import { EditPostSchema } from '@/pages/dashboard/admin/post/edit-post/[id]';

export const fetchPostsList = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get('/posts')
    
    const postsData = response.data
    dispatch(setPosts(postsData));
  } catch (error) {
    console.error('Failed to fetch truck data:', error);
  }
};

export const fetchUserPostsList = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get('/posts/user')
    
    const postsData = response.data
    dispatch(setUserPosts(postsData));
  } catch (error) {
    console.error('Failed to fetch truck data:', error);
  }
};

export const createPost = (data: CreatePostSchema) => async (dispatch: AppDispatch) => {
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

export const getPostById = (id: number | undefined) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.get(`/posts/id/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao buscar post:', error);
      });
    const postData = response?.data.post[0]
    return postData
  } catch (error) {
    console.error('Failed:', error);
    return false
  }
};

export const updatePost = (id: number | undefined, data: EditPostSchema) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.patch(`/posts/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao atualizar post:', error);
      });
      return true
  } catch (error) {
    console.error('Failed:', error);
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
