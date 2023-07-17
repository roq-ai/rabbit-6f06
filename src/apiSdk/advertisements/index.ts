import axios from 'axios';
import queryString from 'query-string';
import { AdvertisementInterface, AdvertisementGetQueryInterface } from 'interfaces/advertisement';
import { GetQueryInterface } from '../../interfaces';

export const getAdvertisements = async (query?: AdvertisementGetQueryInterface) => {
  const response = await axios.get(`/api/advertisements${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAdvertisement = async (advertisement: AdvertisementInterface) => {
  const response = await axios.post('/api/advertisements', advertisement);
  return response.data;
};

export const updateAdvertisementById = async (id: string, advertisement: AdvertisementInterface) => {
  const response = await axios.put(`/api/advertisements/${id}`, advertisement);
  return response.data;
};

export const getAdvertisementById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/advertisements/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAdvertisementById = async (id: string) => {
  const response = await axios.delete(`/api/advertisements/${id}`);
  return response.data;
};
