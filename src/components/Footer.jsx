import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from "../assets/logoWhite.png";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          {/* Column 1: About */}
          <motion.div 
            className="col-md-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h5 className="text-primary mb-4">
              <img src={Logo} alt="Parkeasy" width="175px" />
            </h5>
            <p className="">
              Smart, hassle-free parking solutions for modern cities. 
              Book your spot in advance and save time.
            </p>
            <div className="social-icons mt-4">
              <Link to="#" className=" me-3">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link to="#" className=" me-3">
                <i className="bi bi-twitter"></i>
              </Link>
              <Link to="#" className=" me-3">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link to="#" className="">
                <i className="bi bi-linkedin"></i>
              </Link>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div 
            className="col-md-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className=" footer-link">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/slots" className=" footer-link">Book Parking</Link>
              </li>
              <li className="mb-2">
                <Link to="/bookinghistory" className=" footer-link">Your Bookings</Link>
              </li>
              <li className="mb-2">
                <Link to="/parkinglogin" className=" footer-link">For Providers</Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Support */}
          <motion.div 
            className="col-md-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h5 className="mb-4">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/faq" className=" footer-link">FAQs</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className=" footer-link">Contact Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className=" footer-link">Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className=" footer-link">Terms of Service</Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div 
            className="col-md-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h5 className="mb-4">Contact Us</h5>
            <ul className="list-unstyled ">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i> Vit University, Vellore, India
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i> +91 7015150092
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i> anshvohra1@gmail.com
              </li>
            </ul>
          </motion.div>
        </div>

        <hr className="my-4 bg-secondary" />

        <div className="row">
          <div className="col-md-12 text-center ">
            <p className="mb-0">
              &copy; {currentYear} ParkEasy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;