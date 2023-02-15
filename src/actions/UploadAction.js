import * as UploadApi from '../api/UploadRequest.js'

export const uploadPost = (data)=> async(dispatch)=>{

    dispatch({type: "UPLOAD_START"})
    try {
        const newPost = await UploadApi.uploadPost(data)
        dispatch({type: "UPLOAD_SUCCESS" , data:newPost})
    } catch (error) {
        console.log(error);
        dispatch({type: "UPLOAD_FAIL"})
    }
}