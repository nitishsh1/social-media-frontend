import axios from 'axios';
import { base_Url } from '../Services/helper';

const API = axios.create({baseUrl: base_Url})

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`)

export const likePost = (id,userId)=> API.put(`/post/${id}/like` , {userId:userId});