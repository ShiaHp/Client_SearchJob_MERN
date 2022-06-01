import React , {useState} from 'react'
import {FormRow,Alert} from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import './Profile.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {
  FormattedMessage,
  FormattedDate,
  FormattedNumber,
  FormattedPlural, 
  FormattedTime
} from 'react-intl';
const Profile = () => {
  const {user,showAlert,displayAlert,updateUser,isLoading} = useAppContext();
 
  const [name,setName] = useState(user?.name);
  const [email,setEmail] = useState(user?.email);
  const [lastName,setLastName] = useState(user?.lastName);
  const [location,setLocation] = useState(user?.location);
  const [avatar,setAvatar] = useState(user?.avatar);
  const [open,setOpen] = useState(false)
  const [previewUrl,setPreviewUrl] = useState([])
  console.log(avatar)

    const handleSubmit = (e) =>{
      e.preventDefault();
     const formData = new FormData();
    //  const reader = new FileReader();
    //  if (avatar) {
    //   reader.readAsDataURL(avatar);
    // }
    //   reader.onload = (readerEvent) => {
    //  formData.append('avatar',readerEvent.target.result);
    //  console.log(readerEvent.target.result)
    // };


      const id = user.id;
      formData.append('name',name);
      formData.append('email',email);
      formData.append('lastName',lastName);
      formData.append('location',location);
      formData.append('avatar',avatar);
    

      // remove while testing
      if(!email || !location || !name || !lastName)
              { 

                displayAlert()
                return
              }    
                updateUser({id,formData})
                
    }
    const onFileChange = (event) => {
      let data = event.target.files;
      let file = data[0];
   
      if(file){
        let ObjectUrl = URL.createObjectURL(file)
        setPreviewUrl(ObjectUrl)
        setAvatar(file)
      }
     
    
    }
   return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert/>}
        <div className="form-center">
          <FormRow type="text"  labelText={<FormattedMessage id="name"/>} name="name" value={name} handleChange={(e)=>setName(e.target.value)}/>
          <FormRow type="text"  labelText={<FormattedMessage id="lastName"/>} name="lastName" value={lastName} handleChange={(e)=>setLastName(e.target.value)}/>
          <FormRow type="email"  name="email" value={email} handleChange={(e)=>setEmail(e.target.value)}/>
          <FormRow type="location" labelText={<FormattedMessage id="location"/>}  name="location" value={location} handleChange={(e)=>setLocation(e.target.value)}/>
     <div className="preview-img-container">
         <input  id="previewImg" type="file" name="avatar" hidden onChange={onFileChange}/>
         <label className="preview-upload" htmlFor='previewImg'>Tải Ảnh</label>
         <div className="preview-image"
         style={{backgroundImage: `url(${previewUrl})`}} onClick={(e) => setOpen(!open)}
         >

         </div>
         </div>
      
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading? <FormattedMessage id="wait" />  :<FormattedMessage id="save" />}
          </button>
        </div>
      </form>

{open && 
      <Lightbox
 mainSrc={previewUrl}
 onCloseRequest={() =>  setOpen(!open)}
 />
}
    </Wrapper>
  )
}

export default Profile