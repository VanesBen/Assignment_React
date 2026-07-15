import { useNavigate } from 'react-router'
import logoImg from '../../assets/images/logo.png'
import Button from './Button'

export default function Navbar() {
    const navigate = useNavigate()

    function handleLogin() {
        navigate('/login')
    }

    return (
        <nav className="flex justify-between border-b-2 border-b-white py-4 px-10" id="navbar">
            <a href='/' className="flex gap-4 items-center">
                <img  src={logoImg} alt=""/>
                <h1>DibiTech</h1>
            </a>
            <div className="flex">
                <ul className='gap-4 hidden md:flex md:items-center md:mr-4'>
                    <li ><a className="hover:text-smoke" href="#hero" >Explore</a></li>
                    <li ><a className="hover:text-smoke" href="#category" >Categories</a></li>
                    <li ><a className="hover:text-smoke" href="">Cart</a></li>
                </ul>
                <Button onClick={handleLogin} title="Login" />
            </div>
        </nav>
    )
}