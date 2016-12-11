import React from 'react';
import './style.css';
const LandingPage = () => {
    return (
      <div className="sans-serif">
        <div className="landing-splash cover bg-left bg-center-l">
          <div className="bg-black-80 pb5 pb6-m pb7-l">
            <div className="tc-l pt5-m pt6-l ph3">
              <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">Built for developers</h1>
              <h2 className="fw1 f3 white-80 mt3 mb4">Designed to simplify note taking experience</h2>
              <a className="f5 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3" href="login/">Login</a>
              <span className="dib v-mid ph3 white-70 mb3">or</span>
              <a className="f5 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3" href="/signup">Sign up for free</a>
            </div>
          </div>
        </div>
        <footer className="pv4 ph3 ph5-m ph6-l mid-gray">
          <small className="f6 db tc">© 2016 <b className="ttu">By Song Ji </b>, made with ❤️, All Rights Reserved</small>
          <div className="tc mt3">
            <a href="http://github.com/jamesonji" 
              title="github" 
              target="_blank" 
              className="f3 dib ph2 link mid-gray dim">
              <i className="fa fa-github"></i>
            </a>
            <a href="http://www.linkedin.com/in/song-ji" 
              title="linkedin"
              target="_blank"  
              className="f3 dib ph2 link mid-gray dim">
              <i className="fa fa-linkedin-square"></i>
            </a>
          </div>
        </footer> 
      </div>

    )
};

export default LandingPage;