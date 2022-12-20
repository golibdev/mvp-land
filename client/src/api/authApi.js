import axios from 'axios';
import { baseUrl, headers } from '../constants'

export const authApi = {
   getAll: () => axios.get(
      baseUrl+'admin',
      headers
   ),
   getMyData: () => axios.get(
      `${baseUrl}admin/get-my-data`,
      headers
   ),
   login: (params) => axios.post(
      `${baseUrl}admin/login`,
      params
   ),
   register: (params) => axios.post(
      `${baseUrl}admin/register`,
      params
   ),
   update: (params) => axios.put(
      `${baseUrl}admin/update`,
      params,
      headers
   )
} 