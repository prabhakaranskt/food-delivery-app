import React, { useEffect, useRef } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const LandingPage = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="landing-page-wrapper">
        <nav>
          <div className="nav-header">
            <div className="img-logo">
              <img src={assets.logoOrange} alt="logo" />
            </div>
            <div className="links">
              <a href="#homee">Home</a>
              <a href="#start">Product</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">About</a>
            </div>
          </div>
        </nav>
        <main>
          <div
            className="register-info"
            id="homee"
            style={{ backgroundImage: `url(${assets.backGround})` }}
          >
            <div className="img-bgd"></div>

            <div className="head-wrapper">
              <div className="text-content">
                <h4 className="app-slide">Food App</h4>
                <h1 className="app-slide">
                  Your next meal is just a tap away!
                </h1>
                <p className="app-slide">Login/Register for now on </p>
                <div className="btn-wrapper app-slide">
                  <button
                    className="btn-reg"
                    id="log-reg"
                    onClick={handleLoginClick}
                  >
                    Login / Register
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="app-desktop">
            <img
              src={assets.desktopPhoto}
              data-aos="flip-left"
              data-aos-duration="800"
            />
          </div>
          <div className="h1only">
            <h1 id="start">How the app works ?</h1>
          </div>
          <div className="crave-it">
            <div
              className="login-demo"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <img src={assets.appOne} alt="user-demo" />
            </div>
            <div className="create-text1">
              <h4
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-delay="600"
              >
                Crave it. Tap it. Get it.
              </h4>
              <h2
                data-aos="fade-left"
                data-aos-duration="600"
                data-aos-delay="1000"
              >
                Start by Creating Your <br /> Personalized Account
              </h2>
              <p
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1500"
              >
                Unlock a world of mouthwatering meals, exclusive offers, and
                lightning-fast delivery. Sign up to explore curated dishes,
                top-rated restaurants, and flavors tailored just for you.
              </p>
            </div>
          </div>

          <div className="discover">
            <div className="create-text2">
              <h4
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-delay="600"
              >
                Discover. Dine. Delight.
              </h4>
              <h2
                data-aos="fade-right"
                data-aos-duration="600"
                data-aos-delay="1000"
              >
                Fuel Your Cravings with Something New
              </h2>
              <p
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1500"
              >
                Bored of the same old? Mix it up! Explore trending dishes, local
                favorites, and chef specials that keep your cravings guessing.
                Let your next food obsession find you.
              </p>
            </div>
            <div
              className="login-demo2"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <img src={assets.appTwo} />
            </div>
          </div>

          <div className="confirm">
            <div
              className="login-demo3"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <img src={assets.appThree} />
            </div>

            <div className="create-text3">
              <h4
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-delay="600"
              >
                Confirm and Crave On
              </h4>
              <h2
                data-aos="fade-left"
                data-aos-duration="600"
                data-aos-delay="1000"
              >
                Finalize your selections and get ready to dig in.
              </h2>
              <p
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="1500"
              >
                Review your cart, tweak your order, and choose your drop-off
                method. With seamless payment and instant confirmation, your
                next meal is just seconds away.
              </p>
            </div>
          </div>

          <div className="background-last" id="contact">
            <div
              className="last-bg"
              style={{ backgroundImage: `url(${assets.backGroundLast})` }}
            >
              <div className="bg-last"></div>
            </div>

            <div className="last-text">
              <h1 data-aos="fade-down" data-aos-duration="800">
                Get the App. Get the Flavor.
              </h1>
              <p
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-delay="500"
              >
                Take your cravings on the go. With the MealMate app, you get
                faster ordering, exclusive deals, real-time tracking, and
                personalized recommendations—all in one easy-to-use app.
                Available on Android and iOS. Start your flavor journey today
              </p>

              <div
                className="button-row"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <button className="btn-android">Play store</button>
                <button className="btn-ios">App Store </button>
              </div>
            </div>
          </div>
        </main>
        <footer id="faq">
          <div className="footer">
            <div className="logo-last">
              <img src={assets.logoOrange} alt="logo-last" />
            </div>
            <div className="icons">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <p className="footer-para">
            {" "}
            Copyright &copy; 2025 MealMate. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
