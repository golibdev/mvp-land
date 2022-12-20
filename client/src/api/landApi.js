import axios from 'axios';
import { baseUrl, headers } from '../constants'

export const landApi = {
   getAll: () => axios.get(
      `${baseUrl}land`,
      headers
   ),
   create: (params) => axios.post(
      `${baseUrl}land`,
      params,
      headers
   ),
   update: (id, params) => axios.put(
      `${baseUrl}land/${id}`,
      params,
      headers
   )
} 