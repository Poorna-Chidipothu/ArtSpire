import React, { useState } from 'react'

const Password = ({ onChangeHandler,pass,placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input_box">
            <input type={showPassword ? "text" : "password"} name="password" onChange={onChangeHandler} value={pass} placeholder={placeholder} required />
            <i className="uil uil-lock password"></i>
            <i className={showPassword ? "uil uil-eye pw_hide" : "uil uil-eye-slash pw_hide" } onClick={() => setShowPassword(!showPassword)}></i>
        </div>
    )
}

export default Password;
