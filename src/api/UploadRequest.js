import axios from 'axios';
import { base_Url } from '../Services/helper';
const config = {
    headers: {
        'Accept':"*/*",
        'Content-Type': 'multipart/form-data'
    }
}
const API = axios.create({baseUrl:base_Url});
export const uploadPost = (data) => API.post('/post',data,config);
