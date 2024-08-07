import './Home.css'
import Hero from '../../components/Hero/Hero'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/storeContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [allImages,setAllImages] = useState([]);
  const {url,setPopUp,setCurrentState,setMenuItem,token} = useContext(StoreContext);

  useEffect(()=>{
    const fetchHomeImages = async()=> {
        const result = await axios.get(`${url}/api/get-img//get-home-images`);
        setAllImages(result.data.images);
    }
    fetchHomeImages();
  },[]);

  return (
    <>
    <Hero/>
    <section className="home">
        {allImages && (
          <>
            <ul className="images_list">
                {allImages.map((item,index)=>(
                  <li className="image" key={index}>
                    <img src={item.picture.picture_url}/>
                  </li>
                ))}
            </ul>
            <div className="signup_msg">
              {!token 
              ? <>
                  <p>Join us today <br /> to discover an endless collection of breathtaking images!</p>
                  <button className='button' onClick={()=>{setPopUp(true);setCurrentState('signup')}}>Sign Up <ion-icon name="arrow-forward-outline"></ion-icon></button>
                </>
              :
                <>
                  <p>Do you like the images? <br /> you can discover breathtaking images by visting the Gallery</p>
                  {/* <button onClick={()=>{}}>Go to Gallery <ion-icon name="arrow-forward-outline"></ion-icon></button> */}
                  <Link to='/gallery' className='button' onClick={()=>{setMenuItem('gallery')}}>Go to Gallery <ion-icon name="arrow-forward-outline"></ion-icon></Link>
                </>
              }
              
              
            </div>
          </>
        )}
        
    </section>
    </>
  )
}

export default Home
