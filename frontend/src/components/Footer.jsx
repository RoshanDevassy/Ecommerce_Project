import "./footer.css";
import Facebook from '../assets/images/icons/Facebook.png'
import Google from "../assets/images/icons/google.png"
import Linkedin from "../assets/images/icons/linkedin.png"
import Twitter from "../assets/images/icons/twitter.png"
import Spotify from "../assets/images/icons/spotify.png"
export default function Footer() {
  return (
    <>
      <footer className="container-fluid footer-wrapper">
        <div className="container footer-quicklinks-wrapper">
          <div className=" footer-content">
            <div className="footer-content-header">
              <span className=""></span>
              <p>ABOUT STORE</p>
            </div>
            <div className="footer-content-body">
              <p>234 Heaven Stress, Beverly Hill.</p>
              <p>800 123 456 789</p>
              <p>Contact@erentheme.com</p>
            </div>
          </div>
          <div className=" footer-content">
            <div className="footer-content-header">
              <span className=""></span>
              <p>MY ACCOUNT</p>
            </div>
            <div className="footer-content-body">
              <ul>
                <li>My Account</li>
                <li>Login</li>
                <li>My Cart</li>
                <li>Wishlist</li>
                <li>Checkout</li>
                <li>UserInfo</li>
              </ul>
            </div>
          </div>
          <div className=" footer-content">
            <div className="footer-content-header">
              <span className=""></span>
              <p>INFORMATION</p>
            </div>
            <div className="footer-content-body">
              <ul>
                <li>My Account</li>
                <li>Login</li>
                <li>My Cart</li>
                <li>Wishlist</li>
                <li>Checkout</li>
                <li>UserInfo</li>
              </ul>
            </div>
          </div>
          <div className=" footer-content">
            <div className="footer-content-header">
              <span className=""></span>
              <p>CUSTOMER SERVICE</p>
            </div>
            <div className="footer-content-body">
              <ul>
                <li>My Account</li>
                <li>Login</li>
                <li>My Cart</li>
                <li>Wishlist</li>
                <li>Checkout</li>
                <li>UserInfo</li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="container copyrights-wrapper">
            <div>
                <p>Copyright@2016 Eren. All Right Reserved.</p>
            </div>
            <div className="social-links">
                <span></span><img src={Linkedin} alt="Facebook Logo" />
                <span></span><img src={Twitter} alt="Facebook Logo" />
                <span></span><img src={Facebook} alt="Facebook Logo" />
                <span></span><img src={Spotify} alt="Facebook Logo" />
                <span></span><img src={Google} alt="Facebook Logo" />
                <span></span>                
            </div>
        </div>
      </footer>
    </>
  );
}
