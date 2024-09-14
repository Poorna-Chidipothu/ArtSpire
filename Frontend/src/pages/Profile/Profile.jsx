import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='profile' style={{marginTop : '100px'}}>
        <span className='profile_img'>{localStorage.getItem('name')[0]}</span>

        <div className="profile_name">
            <h3>Name:</h3>
            <p>{localStorage.getItem('name')}</p>
        </div>
        <div className="profile_email">
            <h3>Email:</h3>
            <p>{localStorage.getItem('email')}</p>
        </div>

        <Link to="/change-password" className='change_pass'>Forgot/Change Password</Link>
    </div>
  )
}

export default Profile
