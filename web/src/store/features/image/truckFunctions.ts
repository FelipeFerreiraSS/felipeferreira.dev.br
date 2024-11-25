
import { AppDispatch } from '../../store';
import { api } from '@/services/api';
import { parseCookies } from 'nookies';
import { setImages, setUserImages } from './imageSlice';
import { del, put } from '@vercel/blob';
import { customAlphabet } from 'nanoid';

export const fetchImagesList = () => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.get(`/images`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao obter lista de imagems:', error);
      });
    const imageData = response?.data.allImages
    dispatch(setImages(imageData));
  } catch (error) {
    console.error('Failed to fetch truck data:', error);
  }
};

export const fetchUserImagesList = () => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    const response = await api.get(`/images/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao obter lista de imagems:', error);
      });
      console.log(response);
      
    const imageData = response?.data.allImages
    dispatch(setUserImages(imageData));
  } catch (error) {
    console.error('Failed to fetch truck data:', error);
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
    const blob = await put(filename, file, {
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

// Função para criar a imagem na API
export const createImage = (imageUrl: string) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies();
  const data = {
    imageUrl: imageUrl
  };
  try {
    await api.post('/images', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    console.error('Erro ao criar imagem:', error);
    return false;
  }
};

// Função principal que combina o upload da imagem e criação da imagem na API
export const uploadAndCreateImage = (file: File) => async (dispatch: AppDispatch) => {
  try {
    const imageUrl = await uploadImage(file); 
    return await dispatch(createImage(imageUrl));
  } catch (error) {
    console.error('Erro durante o upload e criação da imagem:', error);
    return false;
  }
};

export const deleteImage = (id: number, url: string) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  try {
    await api.delete(`/images/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    await del(url, {
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });
    return true
  } catch (error) {
    console.error('Failed deleteImage:', error);
    return false
  }
};
