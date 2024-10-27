
import { AppDispatch } from '../../store';
import { api } from '@/services/api';
import { parseCookies } from 'nookies';
import { setAnalytics } from './analyticSlice';

export const fetchAnalytics = () => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.get(`/analytics`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao obter analytics:', error);
      });
      
    const analytics = response?.data.analytics
    dispatch(setAnalytics(analytics));
  } catch (error) {
    console.error('Failed to fetch truck data:', error);
  }
};

