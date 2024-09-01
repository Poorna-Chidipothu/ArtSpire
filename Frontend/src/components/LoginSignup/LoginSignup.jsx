// import React from 'react'
import { useState } from 'react'
import './LoginSignup.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'
import axios from "axios"

const LoginSignup = () => {

    const {setPopUp,currentState,setCurrentState,url,setToken,setUsername} = useContext(StoreContext);
    
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}));
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if(currentState === 'login'){
            newUrl += '/api/user/login';
        }
        else{
            newUrl += '/api/user/register';
        }
        
        const response = await axios.post(newUrl,data);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token);
            setPopUp(false);
            setUsername(response.data.name);
            localStorage.setItem('name',response.data.name);
        }
        else{
            alert(response.data.message);
        }
    }
    

  return (
    <div className="wrapper">
        <div className="container">
            <i onClick={()=> setPopUp(false)} className="uil uil-times-square form_close" id="reg_cls"></i>
            <div className="form">
                <form onSubmit={onLogin} className="rform" method="post">
                    <h2>{currentState==='signup' ? 'Signup' : 'Login'}</h2>
                    {currentState==='signup' 
                        ? <div className="input_box">
                            <input type="text" name="name" onChange={onChangeHandler} value={data.name} id="name-Input" placeholder="Enter Your Name" required />
                            <i className="uil uil-user email"></i>
                        </div>
                        :<></>    
                    }
                    
                    <div className="input_box">
                        <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Enter Your email" required />
                        <i className="uil uil-envelope-alt email"></i>
                    </div>

                    <div className="input_box">
                        <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Enter your password" required />
                        <i className="uil uil-lock password"></i>
                        <i className="uil uil-eye-slash pw_hide"></i>
                    </div>

                    <button type="submit" className="button">{currentState==='signup' ? 'Create Accout' : 'Login Now'}</button>
                    {currentState==='signup' 
                    ? <div className="login_singnup">
                        Already Have An Account? <span onClick={()=> setCurrentState('login')}>Login</span>

                      </div>
                    : <div className="login_singnup">
                        Don&apos;t Have An Account? <span onClick={()=> setCurrentState('signup')}>SignUp</span>
                      </div>
                    }
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginSignup
