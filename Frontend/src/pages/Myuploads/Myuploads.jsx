import { useContext, useEffect } from 'react'
import './Myuploads.css';
import axios from 'axios';
import { StoreContext } from '../../context/storeContext';


const Myuploads = () => {
    const { url,setAlertBox,setImgId,myImages,setMyImages } = useContext(StoreContext);
    
    

    const handleDelClick = (imgId) => {
      setAlertBox(true);
      setImgId(imgId);
    }
    
    

    useEffect(() => {
        const fetchMyUploads = async () => {
            const response = await axios.get(`${url}/api/get-img/my-uploads`,
                {
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
                }
            );
            setMyImages(response.data.images.reverse());
        }
        fetchMyUploads();
    },[]);
  return (
    <>
        <div className="myuploads_container">
            <h2>Your Uploads </h2>
            <ul className="images_list"> 
              {myImages.map((image,index)=>(
                <li key={index} className="image">
                  <img src={image.picture.picture_url}/>
                  <span className="img_like"><ion-icon name="close-outline" onClick={()=>handleDelClick(image._id)}></ion-icon></span>
                  <span className='likes'><ion-icon name="heart"></ion-icon> {image.likes}</span>
                  <a href={image.picture.picture_url} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
                </li>
              ))}
            </ul>
        </div>
    </>
  )
}

export default Myuploads
