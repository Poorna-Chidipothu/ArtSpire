// import React from 'react'
import { useContext } from 'react'
import img_1 from '../../assets/Not Login.svg'
import './NotLoggedIn.css'

const NotLoggedIn = () => {
    const {setPopUp,setCurrentState} = useContext;


  return (
    <section className='notsignin'>
        <img src={img_1} alt="" />
        <p><span>Your are not Logged in!</span> <br /> Please login to see the content.</p>
        {/* <div className="not_controlls">
            <button onClick={()=> {setPopUp(true);setCurrentState('login')}} className='LoginSigup'>Login</button>
            <button onClick={()=> {setPopUp(true);setCurrentState('signup')}} className='LoginSigup'>Signup</button>
        </div> */}
    </section>
  )
}

export default NotLoggedIn
