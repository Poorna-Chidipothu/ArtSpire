// import React from 'react'
import './Gallery.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context/storeContext';

const Gallery = () => {
  const {url} = useContext(StoreContext);
  const [allImages,setAllImages] = useState([]);

  const getDownloadUrl = (url) => {
    const cloudinaryBase = 'res.cloudinary.com';
    if (url.includes(cloudinaryBase)) {
      return url.replace('/upload/', '/upload/fl_attachment/');
    }
    return url;
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.post(`${url}/api/like/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data.message);
      // Update the likes count in the state
      setAllImages(allImages.map((img) => {
        if (img._id === id) {
          return { ...img, likes: img.likes + 1 };
        }
        return img;
      }));
    } catch (error) {
      console.error('Error liking image:', error);
    }
  };

  useEffect(()=>{
    const fetchImages = async()=> {
        const result = await axios.get(`${url}/api/get-img/get-images`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAllImages(result.data.images);
    }
    fetchImages();
  },[])
  return (
    <>
      <section className='gallery'>
        <div className="search_box">
          <form action="">
            <ion-icon name="search-outline"></ion-icon>
            <input type="text" placeholder='Search Images...' />
            <ion-icon name="close-outline"></ion-icon>
            <button type='submit'>Search</button>
          </form>
        </div>
        <div className="gallery_container"> 
          <ul className="images_list">
              {allImages.reverse().map((image,index)=>(
                <li key={index} className="image">
                  <img src={image.url}/>
                  <span className="img_like"><ion-icon onClick={() => handleLike(image._id)} name="heart-outline"></ion-icon></span>
                  <div className="image_content">
                    <h3>{image.uploader}</h3>
                    <a href={getDownloadUrl(image.url)} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
                  </div>
                </li>
              
              ))}
          </ul>
        </div>
        {/* <button>Load More</button> */}
      </section>
    </>
  );
}

export default Gallery
