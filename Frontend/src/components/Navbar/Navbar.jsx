// import React from 'react'
import { useContext, useEffect } from 'react';
import './Navbar.css'
// import Logo from '../../assets/Logo.png'
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import LoginSignup from '../LoginSignup/LoginSignup';
import { StoreContext } from '../../context/storeContext';
import axios from 'axios';
import Search from '../Search/Search';


const Navbar = () => {
  const {popUp,setPopUp,setCurrentState,url,setMenuItem,token,setToken,username,setUsername,alertBox,setAlertBox,imgId,myImages,setMyImages} = useContext(StoreContext);
  const [showMenu,setShowMenu] = useState('');
  const [searchOpen, setSearchOpen] = useState(false); 
  const [headStyle,setHeadStyle] = useState({
    backgroundColor: 'transparent',
    boxShadow: 'none'
  });
  
  useEffect(()=> {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHeadStyle({ 
          backgroundColor: '#f2fbea',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'
        });
      }else{
        setHeadStyle({
          backgroundColor: '#f2fbea',
          boxShadow: 'none'
        });
      }

      if (localStorage.getItem('menu') === 'home' && window.scrollY < 200) {
        setHeadStyle({
          backgroundColor: 'transparent',
          boxShadow: 'none'
        })
      }
    }
    window.addEventListener('scroll',handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    } 
  },[]);

  useEffect(()=>{
    if(popUp){
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "auto";
    }
    
    return ()=>{
      document.body.style.overflow = "auto";
    }
  },[popUp]);
  
  const navigate = useNavigate();

  const logout = () => {
    setMenuItem('home');
    localStorage.setItem('menu','home');
    localStorage.removeItem('token');
    setToken('');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setUsername('');
    navigate('/');
    
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${url}/api/delete/${imgId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data.message);
      setMyImages(myImages.filter((img) => img._id !== imgId));
      setAlertBox(false); 
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }

  return (
    <header style={headStyle}>
      {alertBox 
              && 
              <div className="alert">
                <p>Are you sure you want to delete it?</p>
                <div className="alert_controls">
                  <button onClick={() => handleDelete()}>Yes</button>
                  <button onClick={()=>setAlertBox(false)}>No</button>
                </div>
              </div>  
      }

      {popUp ? <LoginSignup setPopUp={setPopUp}/> : <></>}
      <nav>
        <div className="menu_toggle" onClick={()=> setShowMenu('show_menu')}>
          {/* <i className="ri-menu-2-fill"></i> */}
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <Link to='/' onClick={()=> {setMenuItem('home');localStorage.setItem('menu','home')}}>
          <div className="logo">
            {/* <img src={Logo} alt="" /> */}
            <p>ArtSpire</p>
          </div>
        </Link>
        <div className={`nav ${showMenu}`} >
          <span className="menu_close_icon" onClick={()=> setShowMenu('')}><ion-icon name="close-outline"></ion-icon></span>
          <ul className="nav_items">
            <Link to='/' className={`nav_item ${localStorage.getItem('menu')==='home' ? 'active' : ''}`} onClick={()=> {setMenuItem('home'); setShowMenu('');localStorage.setItem('menu','home')}}>Home <ion-icon name="arrow-forward-outline"></ion-icon></Link>
            <Link to='/about' className={`nav_item ${localStorage.getItem('menu')==='about' ? 'active' : ''}`} onClick={()=>{setMenuItem('about'); setShowMenu('');localStorage.setItem('menu','about')}}>About <ion-icon name="arrow-forward-outline"></ion-icon></Link>
            <Link to='/ai-gen' className={`nav_item ${localStorage.getItem('menu')==='aigen' ? 'active' : ''}`} onClick={()=>{setMenuItem('aigen'); setShowMenu('');localStorage.setItem('menu','aigen')}}>AiGen <ion-icon name="arrow-forward-outline"></ion-icon></Link>
            <Link to='/gallery' className={`nav_item ${localStorage.getItem('menu')==='gallery' ? 'active' : ''}`} onClick={()=>{setMenuItem('gallery'); setShowMenu('');localStorage.setItem('menu','gallery')}}>Gallery <ion-icon name="arrow-forward-outline"></ion-icon></Link>
          </ul>
        </div>
      </nav>
      <div className="nav_controlls">
        {!token
        ? <>
            <button onClick={()=> {setPopUp(true);setCurrentState('login')}} className='Login'>Login</button>
            <button onClick={()=> {setPopUp(true);setCurrentState('signup')}} className='Signup'>Signup</button>
          </>
        :
          <>
            {localStorage.getItem('menu')==='gallery' ? <span className='search_icon' onClick={() => setSearchOpen(true)}><ion-icon name="search-outline"></ion-icon></span> : <></>}
            <Link to='/upload' ><button className='upload_btn' onClick={() => localStorage.setItem('menu','')}><span className="icon"><i className="uil uil-upload"></i></span><span className="text">Upload</span></button></Link>
            <div className="user_info">
              <div>
                <span><ion-icon name="person"></ion-icon></span>
                <span className='name'>{username}</span>
                <span><ion-icon name="chevron-down-outline"></ion-icon></span>
              </div>
              <ul className="user_info_settings">
                <Link to='/profile' className="user_option"><span><i className="ri-user-settings-fill"></i></span> Profile</Link>
                <Link to='/favourites' className="user_option" onClick={() => localStorage.setItem('menu','')}><span><ion-icon name="heart-circle"></ion-icon></span> My Favorites</Link>
                <Link to='/my-uploads' className="user_option" onClick={() => localStorage.setItem('menu','')}><span><i className="uil uil-upload"></i></span> My Uploads</Link>
                <li className="user_option logout" onClick={logout}><span><ion-icon name="log-out-outline"></ion-icon></span> Logout</li>
              </ul>
            </div>
          </>
        }
        
      </div>
      {searchOpen ? <Search setSearchOpen={setSearchOpen}/> : <></>}
      
    </header>
  )
}

export default Navbar
