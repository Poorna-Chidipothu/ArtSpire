// import React from 'react'
import './Home.css'
import img_1 from '../../assets/img-1.jpg'
import img_2 from '../../assets/img-2.jpg'
import Hero from '../../components/Hero/Hero'
import { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'
import { Link } from 'react-router-dom'

const Home = () => {

  const {setPopUp,setCurrentState,setMenuItem,token} = useContext(StoreContext);
  return (
    <>
    <Hero/>
    <section className="home">
        <ul className="images_list">
            <li className="image">
              <img src={img_1}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_1} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_2}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_2} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_1}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_1} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_2}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_2} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_1}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_1} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_2}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_2} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_2}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_2} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_1}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_1} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_2}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_2} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_1}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_1} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_2}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_2} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_1}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_1} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_2}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_2} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_1}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_1} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_2}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_2} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_1}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_1} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>

            <li className="image">
              <img src={img_2}/>
              <span className="img_like"><ion-icon name="heart-outline"></ion-icon></span>
              <div className="image_content">
                <h3>Image 1</h3>
                <a href={img_2} download className="img_dwn"><ion-icon name="arrow-down-outline"></ion-icon></a>
              </div>
            </li>
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
    </section>
    </>
  )
}

export default Home
