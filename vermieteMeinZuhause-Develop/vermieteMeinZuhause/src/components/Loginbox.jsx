import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Loginbox = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            
            const response = await axios.post('http://localhost:3000/user/login', formData)
            console.log('Loged in with:', response.data)

            setFormData({
                username: '',
                password:'',
            })
            
            sessionStorage.setItem('token', response.data)
            toast.success('Eingeloggt!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }catch(error){
            console.error('Error sending user data:', error.message)
            toast.error('Nutzername oder Passwort falsch!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

  return (
    <div className='loginbox'>
        <h1>Login</h1>
        <form className='loginform' onSubmit={handleSubmit}>
            <label >
                <h2>Username</h2>
                <input name='username' value={formData.username} type="text"  onChange={handleChange} />
            </label>
            <label >
                <h2>Password</h2>
                <input name='password' value={formData.password} type="password" onChange={handleChange} />
            </label>
            <div>
                <button id='loginbuttoninlogin' className='loginbutton' type='submit'>Anmelden</button>
            </div>

            <h2> or create an account</h2>
          <Link to="/signIn">
            <button className="registerButton">Register</button>
          </Link>
        </form>

    </div>
  )
}

export default Loginbox