// import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'

const Hero = () => {

  const {setPopUp,setMenuItem,setCurrentState,token} = useContext(StoreContext);
  return (
    <section className='hero'>
        <div className="content_container">
            <h1>Discover<br/>Your Artistic Journey</h1>
            <p>with the world of creativity and inspiration</p>
            <div className="hero_controls">
              <Link to='/gallery' onClick={()=>{setMenuItem('gallery')}} className="explore">Explore the Collection <ion-icon name="arrow-forward-outline"></ion-icon></Link>
              {!token ? <a onClick={()=> {setPopUp(true);setCurrentState('signup')}}>Get Started <ion-icon name="arrow-forward-outline"></ion-icon></a> : <></>}
              
            </div>
        </div>
    </section>
  )
}

export default Hero
