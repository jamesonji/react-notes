import React from 'react';
const Footer = () => {
    return (
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
    )
};

export default Footer;