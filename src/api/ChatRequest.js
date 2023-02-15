import axios from 'axios';

import { base_Url } from '../Services/helper';

const API = axios.create({baseUrl: base_Url})

export const startConversation = (data) => API.post('/conversation',data)

export const getConversation = (userId , personId) => API.get(`/conversation/${userId}/to/${personId}`)

export const addMessage = (data) => API.post('/message' ,data)

export const getMessage = (conversationId)=> API.get(`/message/${conversationId}`)