import * as UserApi from '../api/UserRequest'

export const updateUser=(id, userData)=> async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try{
        console.log(userData);
        const {data} = await UserApi.updateUser(id, userData);
        console.log("Action ko receive hoa hy ye : ",data)
        dispatch({type: "UPDATING_SUCCESS", data: data})
    }   
    catch(error){
        dispatch({type: "UPDATING_FAIL"})
    }
}

export const followUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "FOLLOW_USER", data: id})
    UserApi.followUser(id, data)
}

export const unfollowUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "UNFOLLOW_USER", data: id})
    UserApi.unfollowUser(id, data)
}
