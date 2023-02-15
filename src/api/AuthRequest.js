import axios from 'axios';
import { base_Url } from '../Services/helper';

const API = axios.create({baseUrl: base_Url})

export const logIn = (formData)=> API.post('/auth/login' , formData)
export const signUp = (formData)=> API.post('/auth/register' , formData)
// export const sessionExpiredOrNot = (token)=> API.get('/auth/logout' ,  token)