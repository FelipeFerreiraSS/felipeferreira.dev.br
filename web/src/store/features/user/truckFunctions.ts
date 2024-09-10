import { CreateUserType } from '@/pages/dashboard/admin/profile';
import { AppDispatch } from '../../store';
import { setUser } from '../user/userSlice';
import { api } from '@/services/api';
import { parseCookies } from 'nookies';

export const fetchUserInfo = () => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.get(`/user-info`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao obter dados do usuário:', error);
        // Opcional: limpar o token se ocorrer um erro
        // destroyCookie(undefined, 'felipeferreirablog.token');
      });
    const userData = response?.data.user;
    dispatch(setUser(userData));
  } catch (error) {
    console.error('Failed to fetch truck data:', error);
  }
};

export const createUser = (data: CreateUserType) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.post(`/users`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao criar usuário:', error);
      });
    return true
  } catch (error) {
    console.error('Failed createUser:', error);
    return false
  }
};
