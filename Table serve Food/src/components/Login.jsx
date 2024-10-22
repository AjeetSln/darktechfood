import React from 'react'
import './login.css'
import { FaUser, FaLock} from "react-icons/fa";

function Login() {
  return (
    <div className="wrapper">
            <form >
                <h1>Login</h1>
                <div className="input-box">
                <input
                    type="email"
                    placeholder="Username"
                    required
                />
                <FaUser className='icon'/>
                </div>
                <div className="input-box">
                <input
                    type="password"
                    placeholder="Password"
                    required
                />
                <FaLock className='icon'/>
                </div>
                <button type="submit">Login</button>
                
            </form>
        </div>
  );
}

export default Login