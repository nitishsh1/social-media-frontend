import * as ChatApi from '../api/ChatRequest'

export const startConversation = (users)=>async(dispatch)=>{
    dispatch({type:"CONVERSATION_START"})
    try {
        const {data} = await ChatApi.startConversation(users)
        console.log(data);
        dispatch({type:"CONVERSATION_SUCCESS" , data})
    } catch (error) {
        dispatch({type:"CONVERSATION_ERROR"})
    }
}

export const fetchChat = (conversationId)=>async(dispatch)=>{
    dispatch({type:"CHAT_START"})
    try {
        const {data} = await ChatApi.getMessage(conversationId)
        console.log("chat reducers ",data);
        dispatch({type:"CHAT_SUCCESS" , data})
    } catch (error) {
        dispatch({type:"CHAT_ERROR"})
    }
}

export const addChat = (data)=>async(dispatch)=>{
    
        dispatch({type:"CHAT_ADD" , data})
   
}