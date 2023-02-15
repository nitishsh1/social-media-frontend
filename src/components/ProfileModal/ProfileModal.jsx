import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({modalOpened ,setModalOpened, data}) {
  const theme = useMantineTheme();

  const {password , ...other} = data
  const [formData , setFormData] = useState(other)
  const [profilePicture , setProfilePicture] = useState(null)
  const [coverPicture , setCoverPicture] = useState(null)
  const dispatch = useDispatch()
  const params = useParams()
  const {user} = useSelector((state)=>state.authReducer.authData)

  const handleChange = (e)=>{
    setFormData({...formData , [e.target.name]:e.target.value})
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name==='profilePicture'?setProfilePicture(img):setCoverPicture(img)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    console.log(formData);
    form.append("_id" , user._id)
    form.append("country" , formData.country)
    form.append("livesin" , formData.livesin)
    form.append("relationship" , formData.relationship)
    form.append("firstname" , formData.firstname)
    form.append("lastname" , formData.lastname)
    form.append("isAdmin" , formData.isAdmin)
    form.append("worksAt" , formData.worksAt)
   
    
    
    if (profilePicture) {
      form.append("files" , profilePicture )
    }
    if (coverPicture) {
      form.append('files' , coverPicture)
    }
    
   
    dispatch(updateUser(params.id, form));
    setModalOpened(false);
  };


  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() =>setModalOpened(false)} 
    >
      <form action="" className="infoForm">
        <h3>Your info</h3>

        <div>
            <input type="text" name="firstname" placeholder='First Name' className="infoInput" onChange={handleChange} value={formData.firstname} />
            <input type="text" name="lastname" placeholder='Last Name' className="infoInput" onChange={handleChange} value={formData.lastname} />

        </div>

        <div>
        <input type="text" name="worksAt" placeholder='works At' className="infoInput" onChange={handleChange} value={formData.worksAt} />

        </div>
        <div>
            <input type="text" name="livesin" placeholder='Lives in' className="infoInput" onChange={handleChange} value={formData.livesin} />
            <input type="text" name="country" placeholder='Country' className="infoInput" onChange={handleChange} value={formData.country} />

        </div>
        <div>
            <input type="text" name="relationship" placeholder='Relationship status' className="infoInput" onChange={handleChange} value={formData.relationship} />
        </div>
        <div>
        Profile Image
            <input type="file" name="profilePicture" placeholder='' className="infoInput" onChange={onImageChange}  />
            Cover Image
            <input type="file" name="coverPicture" placeholder='' className="infoInput" onChange={onImageChange} />

        </div>
        <button className="button info-button" onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;