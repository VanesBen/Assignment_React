import { useNavigate } from 'react-router'
import logoImg from '../../assets/images/logo.png'
import Button from './Button'
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react'

export default function Navbar() {
    const navigate = useNavigate()
    const { user, logout} = useAuth()
    const isLoggedIn = Boolean(user)

    function handleLogin() {
        navigate('/login')
    }

    function handleLogout() {
        logout()
        navigate("/")
    }

    return (
        <nav className="flex justify-between border-b-2 border-b-white py-4 px-10 mb-5" id="navbar">
            <a href='/' className="flex gap-4 items-center">
                <img  src={logoImg} alt=""/>
                <h1>DibiTech</h1>
            </a>
            <div className="flex">
                {isLoggedIn == false ? 
                    <>
                        <ul className='gap-4 hidden md:flex md:items-center md:mr-4'>
                            <li ><a className="hover:text-smoke" href="#hero" >Explore</a></li>
                            <li ><a className="hover:text-smoke" href="/categories" >Categories</a></li>
                            <li ><a className="hover:text-smoke" href="">Cart</a></li>
                        </ul>
                        <Button onClick={handleLogin} title="Login" />
                    </>
                :
                    <>
                        <Button onClick={handleLogout} title="Logout" />
                    </>
                }
            </div>
        </nav>
        
    )
}