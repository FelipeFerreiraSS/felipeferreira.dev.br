import { AppDispatch } from '../../store';
import { api } from '@/services/api';
import { setTags } from './tagSlice';
import { parseCookies } from 'nookies';
import { EditCriateTagSchema } from '@/pages/dashboard/admin/tags';

export const fetchTagsList = () => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.get(`/tag`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao obter tags:', error);
      });
      
    const tagData = response?.data.allTags
    dispatch(setTags(tagData));
  } catch (error) {
    console.error('Failed to fetch truck data:', error);
  }
};

export const createTag = (data: EditCriateTagSchema) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  
  try {
    const response = await api.post(`/tag`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };

  } catch (error: any) {
    console.error('Erro ao criar Tag:', error);

    return { success: false, error: error.response?.data || 'Erro desconhecido' };
  }
};

export const updateTag = (id: number | undefined, data: EditCriateTagSchema) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.put(`/tag/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('Erro ao atualizar Tag:', error);

    return { success: false, error: error.response?.data || 'Erro desconhecido' };
  }
};

export const deleteTag = (id: number) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.delete(`/tag/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('Erro ao deletar Tag:', error);

    return { success: false, error: error.response?.data || 'Erro desconhecido' };
  }
};