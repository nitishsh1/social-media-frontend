import React, { useState, useRef } from "react";
import "./PostShare.css";
import ProfileImg from "../../img/profileImg.jpg";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import {useDispatch, useSelector} from 'react-redux';
import { uploadPost } from "../../actions/UploadAction";
import { useEffect } from 'react'
import { getTimelinePosts } from '../../actions/PostAction'

const PostShare = () => {
  const loading = useSelector(state => state.postReducer.uploading)
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef()
  const {user} = useSelector((state) => state.authReducer.authData)
  
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img)
    }
  };

  const reset = () => {
    setImage(null)
    desc.current.value = "";
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    
    data.append('userId', user._id)
    data.append('desc', desc.current.value)
    

    if(image){
      console.log(image);
      data.append("image",image)
    }


    dispatch(uploadPost(data));
    reset();
  }

   
  useEffect(() => {
   
    dispatch(getTimelinePosts(user._id))

  }, [loading])
  


  return (
    <div className="PostShare">
      <img src={user.profilePicture? serverPublic+ user.profilePicture: serverPublic+"defaultProfile.png"} alt="" />
      <div>
        <input ref={desc} required type="text" placeholder="What's happening" />
        <div className="postOption">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <button className="button ps-button"
          onClick={handleSubmit}
          disabled={loading}
          >
          {loading? "Uploading...": "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
