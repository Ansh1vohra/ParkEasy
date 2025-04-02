import "./pageComman.css";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { UserContext } from "../UserContext/UserContext";
import { useContext } from "react";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className="home-container">
      <motion.section
        className="hero-section d-flex flex-column justify-content-center align-items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="hero-content text-center">
          <motion.h1 
            className="text-primary headingFont fw-bold mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to <span className="brand-highlight">ParkEasy!</span>
          </motion.h1>
          
          <motion.p 
            className="hero-text mx-auto mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Smart, Hassle-Free Parking - Book Your Spot Online, Show Your QR, and Park with Real-Time Slot Availability!
          </motion.p>

          <div className="cta-buttons">
            <motion.button
              onClick={() => navigate('/slots')}
              className="btn btn-primary btn-lg px-4 py-2"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#0a58ca",
                boxShadow: "0px 4px 12px rgba(13, 110, 253, 0.3)",
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              Book a Slot Now!
            </motion.button>

            {user ? (
              <motion.button
                onClick={() => navigate('/bookinghistory')}
                className="btn btn-light btn-lg px-4 py-2 ms-3"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#212529",
                  color: "#fff",
                  boxShadow: "0px 4px 12px rgba(33, 37, 41, 0.2)",
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                Booking History
              </motion.button>
            ) : (
              <motion.button
                onClick={() => navigate('/parkinglogin')}
                className="btn btn-light btn-lg px-4 py-2 ms-3"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#212529",
                  color: "#fff",
                  boxShadow: "0px 4px 12px rgba(33, 37, 41, 0.2)",
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                Join as Provider
              </motion.button>
            )}
          </div>
        </div>
        
        <motion.div 
          className="scroll-indicator mt-5"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <i className="bi bi-chevron-down fs-1 text-muted"></i>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why Choose ParkEasy?</h2>
          
          <div className="row g-4">
            <motion.div 
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="feature-card p-4 text-center h-100">
                <div className="feature-icon mb-3">
                  <i className="bi bi-clock fs-1 text-primary"></i>
                </div>
                <h3 className="h4 mb-3">Real-Time Availability</h3>
                <p>See which parking spots are available in real-time, eliminating the guesswork and wasted time.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="feature-card p-4 text-center h-100">
                <div className="feature-icon mb-3">
                  <i className="bi bi-qr-code-scan fs-1 text-primary"></i>
                </div>
                <h3 className="h4 mb-3">QR Code Access</h3>
                <p>Simply scan your QR code at the parking entrance for seamless, contactless entry and exit.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="feature-card p-4 text-center h-100">
                <div className="feature-icon mb-3">
                  <i className="bi bi-clock-history fs-1 text-primary"></i>
                </div>
                <h3 className="h4 mb-3">Reservation History</h3>
                <p>Easy access to your parking history with receipts and location details.</p>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">How It Works</h2>
          
          <div className="row g-4">
            <motion.div 
              className="col-md-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="step-card p-3 text-center">
                <div className="step-number mb-3">1</div>
                <h3 className="h5 mb-3">Find Parking</h3>
                <p>Search for available parking spots near your destination.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-md-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="step-card p-3 text-center">
                <div className="step-number mb-3">2</div>
                <h3 className="h5 mb-3">Book & Pay</h3>
                <p>Reserve your spot and pay securely online.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-md-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="step-card p-3 text-center">
                <div className="step-number mb-3">3</div>
                <h3 className="h5 mb-3">QR Code</h3>
                <p>Receive your unique QR code for parking access.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-md-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="step-card p-3 text-center">
                <div className="step-number mb-3">4</div>
                <h3 className="h5 mb-3">Park Stress-Free</h3>
                <p>Scan your QR code at the entrance and enjoy.</p>
              </div>
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">What Our Users Say</h2>
          
          <div className="row">
            <motion.div 
              className="col-lg-6 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-card p-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <div className="user-avatar me-3">
                    <i className="bi bi-person-circle fs-2"></i>
                  </div>
                  <div>
                    <h4 className="h5 mb-0">Ansh Vohra</h4>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>
                </div>
                <p>"ParkEasy saved me so much time during my downtown meetings. No more circling blocks looking for parking!"</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="col-lg-6 mb-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-card p-4 h-100">
                <div className="d-flex align-items-center mb-3">
                  <div className="user-avatar me-3">
                    <i className="bi bi-person-circle fs-2"></i>
                  </div>
                  <div>
                    <h4 className="h5 mb-0">Nithish Selvam</h4>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </div>
                  </div>
                </div>
                <p>"As a parking lot owner, ParkEasy has increased my occupancy by 30%. The management dashboard is incredibly useful."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta py-5 bg-primary text-white">
        <div className="container text-center">
          <motion.h2 
            className="mb-4 fw-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Experience Stress-Free Parking?
          </motion.h2>
          <motion.p 
            className="mb-5 fs-5 mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of happy parkers who save time and money every day.
          </motion.p>
          <motion.button
            onClick={() => navigate('/slots')}
            className="btn btn-light btn-lg px-5 py-3 fw-bold"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#fff",
              color: "#0d6efd",
              boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            Get Started Now
          </motion.button>
        </div>
      </section>
    </div>
  );
}