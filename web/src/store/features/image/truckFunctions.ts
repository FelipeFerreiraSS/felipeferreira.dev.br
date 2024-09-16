
import { AppDispatch } from '../../store';
import { api } from '@/services/api';
import { parseCookies } from 'nookies';
import { setImages } from './imageSlice';
import { del } from '@vercel/blob';

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

export const createImage = (imageUrl: string) => async (dispatch: AppDispatch) => {
  const { 'felipeferreirablog.token': token } = parseCookies()
  const data = {
    imageUrl: imageUrl
  }
  try {
    const response = await api.post(`/images`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .catch(error => {
        console.error('Erro ao criar imagem:', error);
      });
    return true
  } catch (error) {
    console.error('Failed createImage:', error);
    return false
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
