import twitterIc from '../../assets/icon/twitter-ic.png'
import instaIc from '../../assets/icon/insta-ic.png'
import facebookIc from '../../assets/icon/fb-ic.png'

export default function Footer() {
    return (
        <footer className="flex flex-col text-smoke gap-5 justify-center text-center text-l text-darkblue mb-10" id="footer">
            <ul className="grid grid-cols-2 justify-center md:grid-cols-4 mb-5">
                <li ><a href="">About Us</a></li>
                <li ><a href="">Contact</a></li>
                <li ><a href="">Terms of Service</a></li>
                <li ><a href="">Privacy Policy</a></li>
            </ul>
            <ul class="flex gap-3 justify-center items-center">
                <li >
                    <a href=""><img src={twitterIc} alt="twitter"/></a>
                </li>
                <li>
                    <a href=""><img src={instaIc} alt="instagram"/></a>
                </li>
                <li>
                    <a href=""><img src={facebookIc} alt="facebook"/></a>
                </li>
            </ul>
            <div >
                <p>© 2026 DibiTech. All rights reserved.</p>
            </div>
        </footer>
    )
}