const chatReducer = (
    state = {chats:[], chatUser: "",loading: false, error: false },
    action
  ) => {
    switch (action.type) {

        case 'CONVERSATION_START':
            return {...state ,chats:[],chatUser:'' ,loading: true , error: false}
        case 'CONVERSATION_SUCCESS':
          console.log(action.data);
            return {...state , chats:[],chatUser:action.data[1] , loading: false , error: false}
        case 'CONVERSATION_ERROR':
            return {...state , chats:[],chatUser:"",loading: false , error: true}
        case "CHAT_START":
          return {...state ,chats:[],loading: true , error: false}
        case "CHAT_SUCCESS":
          console.log("chat success" , action.data);
          return {...state ,chats:[...action.data],loading: false , error: false}
        case "CHAT_ERROR":
          return {...state ,chats:[...state?.chats],loading: false , error: true}
        case "CHAT_ADD":
          return {...state , chats:[...state?.chats , action.data] ,loading: false , error: false}
      default: 
        return state;
    }
  };
  
  
  export default chatReducer;