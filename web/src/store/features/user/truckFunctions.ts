import { AppDispatch } from '../../store';
import { setUser, setUserId, setUsers } from '../user/userSlice';
import { api } from '@/services/api';
import { parseCookies } from 'nookies';
import { CreateUserSchema } from '@/pages/dashboard/admin/users/create-user';
import { customAlphabet } from 'nanoid';
import { del, put } from '@vercel/blob';
import { UserData } from '@/pages/dashboard/admin/users/edit-user/[id]';

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

export const fetchUsersList = () => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.get(`/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao obter lista de usuários:', error);
      });
      
    const usersData = response?.data.allUsers
    dispatch(setUsers(usersData));
  } catch (error) {
    console.error('Failed to fetch truck data:', error);
  }
};

export const createUser = (data: CreateUserSchema) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.post(`/users`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
    return true
  } catch (error) {
    // Se houver um erro, captura e retorna a mensagem de erro
    // if (error?.response && error.response.data && error.response.data.message) {
    //   console.error('Erro ao criar usuário:', error.response.data.message);
    //   return error.response.data.message;
    // }

    // Caso não tenha uma mensagem de erro específica, retorna o erro geral
    console.error('Erro desconhecido ao criar usuário:', error);
    return 'Erro desconhecido ao criar usuário';
  }
};

export const getUserById = (id: number | undefined) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.get(`/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao buscar usuário:', error);
      });
    const usersData = response?.data.user[0]
    dispatch(setUserId(usersData));
  } catch (error) {
    console.error('Failed:', error);
    return false
  }
};

export const updateUser = (id: number | undefined, data: UserData) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.put(`/users/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao atualizar usuário:', error);
      });
      return true
  } catch (error) {
    console.error('Failed:', error);
    return false
  }
};

export const updateProfileImageUrl = (id: number | undefined, profileImageUrl: string) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  const data = {
    profileImageUrl: profileImageUrl
  }
  try {
    const response = await api.put(`/users/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao atualizar usuário:', error);
      });
      return true
  } catch (error) {
    console.error('Failed:', error);
    return false
  }
};

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) 
// Função para realizar upload da imagem para o Vercel Blob
export const uploadImage = async (file: File) => {
  const contentType = file.type || 'application/octet-stream';
  const filename = `${nanoid()}.${contentType.split('/')[1]}`;
  try {
    const blob = await put('profile-images/' + filename, file, {
      contentType,
      access: 'public',
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw error;
  }
};

export const deleteProfileImage = ( url: string) => async () => {
  try {
    del(url, {
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });
    return true
  } catch (error) {
    console.error('Failed deleteImage:', error);
    return false
  }
};

// Função principal que combina o upload da imagem e adiciona a imagem de perfil do usuário
export const updateProfileImage = (file: File, id: number | undefined, oldProfilePicture?: string) => async (dispatch: AppDispatch) => {
  try {
    const profileImageUrl = await uploadImage(file);
    if (!profileImageUrl) {
      throw new Error('Erro ao obter a URL da nova imagem.');
    }

    if (oldProfilePicture) {
      const deleteSuccess = oldProfilePicture ? await deleteProfileImage(oldProfilePicture)() : true;
      if (!deleteSuccess) {
        throw new Error('Erro ao excluir a imagem antiga.');
      }
    }
    
    return await dispatch(updateProfileImageUrl(id, profileImageUrl));
  } catch (error) {
    console.error('Erro durante a atualização da imagem de perfil do usuário:', error);
    return false;
  }
};

export const deleteUser = (id: number) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.delete(`/users/${id}`, {
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
