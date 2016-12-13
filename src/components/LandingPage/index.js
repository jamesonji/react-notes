import React from 'react';
import Footer from '../Footer';
import './style.css';
const LandingPage = () => {
    return (
      <div className="sans-serif">
        <div className="landing-splash cover bg-left bg-center-l">
          <div className="bg-black-80 pb5 pb6-m pb7-l">
            <div className="tc pt5-m pt6-l ph3">
              <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">Built for developers</h1>
              <h2 className="fw1 f3 white-80 mt3 mb4">Designed to simplify note taking experience</h2>
              <a className="f5 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3" href="login/">Login</a>
              <span className="dib v-mid ph3 white-70 mb3">or</span>
              <a className="f5 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3" href="/signup">Sign up for free</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    )
};

export default LandingPage;