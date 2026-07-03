import logoImg from '../../assets/images/logo.png'
import Button from './Button'

export default function Navbar() {
    return (
        <nav className="flex justify-between border-b-2 border-b-white py-4 px-10" id="navbar">
            <div className="flex gap-4 items-center">
                <img  src={logoImg} alt=""/>
                <h1>DibiTech</h1>
            </div>
            <div className="flex">
                <ul className='gap-4 hidden md:flex md:items-center md:mr-4'>
                    <li ><a className="hover:text-smoke" href="#hero" class="navbar__link">Explore</a></li>
                    <li ><a className="hover:text-smoke" href="#category" class="navbar__link">Categories</a></li>
                    <li ><a className="hover:text-smoke" href="" class="navbar__link">Cart</a></li>
                </ul>
                <Button title="Login" />
            </div>
        </nav>
    )
}