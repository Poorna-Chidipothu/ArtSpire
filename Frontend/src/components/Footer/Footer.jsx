// import React from 'react'
import './Footer.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/storeContext'
import { Link } from 'react-router-dom'

const Footer = () => {
  
    const {setMenuItem} = useContext(StoreContext);

    return (
    <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <div className="logo">
                        {/* <img src={Logo} alt="" /> */}
                        <p>ArtSpire</p>
                    </div>
                    <p>ArtSpire is your portal to creative expression. Explore, upload, and be inspired by stunning imagery from artists worldwide. Discover the future of art with AI-generated visuals and join a thriving community of art enthusiasts.</p>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li onClick={()=>setMenuItem('about')}><Link to="/about">About Us <ion-icon name="arrow-forward-outline"></ion-icon></Link></li>
                        <li onClick={()=>setMenuItem('gallery')}><Link to="/gallery">Gallery <ion-icon name="arrow-forward-outline"></ion-icon></Link></li>
                        <li><Link to="/upload">Upload Your Art <ion-icon name="arrow-forward-outline"></ion-icon></Link></li>
                        <li onClick={()=>setMenuItem('aigen')}><Link to="/ai-gen">AI Gen <ion-icon name="arrow-forward-outline"></ion-icon></Link></li>
                        <li><Link to="/favorites">Favorites <ion-icon name="arrow-forward-outline"></ion-icon></Link></li>
                        <li><Link to="/contact">Contact Us <ion-icon name="arrow-forward-outline"></ion-icon></Link></li>
                    </ul>
                </div>

                {/* Connect With Us */}
                <div className="footer-section">
                    <h3>Connect With Us</h3>
                    <p>Follow us on social media to stay updated with the latest from ArtSpire.</p>
                    <div className="social-links">
                        <a href=""><i className="ri-pinterest-line"></i></a>
                        <a href="https://www.instagram.com/ArtSpire"><i className="ri-instagram-line"></i></a>
                        <a href="https://www.twitter.com/ArtSpire"><i className="ri-twitter-x-line"></i></a>
                        <a href="https://www.facebook.com/ArtSpire"><i className="ri-facebook-fill"></i></a>
                    </div>
                </div>

                {/* Newsletter */}
                {/* <div className="footer-section">
                    <h3>Newsletter</h3>
                    <p>Subscribe to our newsletter to receive updates and exclusive content.</p>
                    <form action="/subscribe" method="post">
                        <input type="email" name="email" placeholder="Enter your email" className="email-input" />
                        <button type="submit" className="subscribe-button">Subscribe</button>
                    </form>
                </div> */}
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 ArtSpire. All rights reserved.</p>
                <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
            </div>
        </footer>
  )
}

export default Footer
