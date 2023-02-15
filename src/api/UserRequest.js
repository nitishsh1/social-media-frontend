import axios from 'axios';
import { base_Url } from '../Services/helper';

const API = axios.create({baseUrl: base_Url})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });


export const getUser =(userId)=> API.get(`/user/${userId}`)

export const updateUser = (userId , data)=> API.put(`/user/${userId}`,data);

export const getAllUser = ()=> API.get('/user')

export const followUser = (id,data)=> API.put(`/user/${id}/follow`, data)
export const unfollowUser = (id, data)=> API.put(`/user/${id}/unfollow`, data)