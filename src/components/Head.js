import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Col, Dropdown, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Link, NavLink, Router } from "react-router-dom";
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';

export default function Header() {
  const logoImage = "https://greatbritish.b-cdn.net/wp-content/uploads/2022/01/gbt-logo.png"
  const [menuVisible, setMenuVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);

  //  ************* Menu Open when click on toggle button *********** //;
  const toggleMenu = () => {
    const logoWrap = document.querySelector('.menuLink');
    logoWrap.classList.toggle('logoWrapHidden');
  };

  // ************ Menu close when click on menu *********** //; 
  const closeMenu = () => {
    const logoWrap = document.querySelector('.menuLink');
    logoWrap.classList.remove('logoWrapHidden');
  }
  return (
    <>
      <header>
        <Row className="align-items-center desktopHeader">
          <Col md={3}>
            <div className="logoWrap">
              <Link to="/">
                <img src={logoImage} alt="" />
              </Link>
            </div>
          </Col>
          <Col md={7}>
            <ul className="appMenuList">
              {/* <li>
                <NavLink to="/" exact>Home</NavLink>
              </li> */}
              <li>
                <NavLink to="/voices" exact>Voices</NavLink>
                <ul>
                  <li><NavLink to="/characteractors" exact>Character Actors</NavLink></li>
                  <li><NavLink to="/educationalexplainer" exact>Educational & Explainer</NavLink></li>
                  <li><NavLink to="/femalevoiceovers" exact>Female Voiceovers</NavLink></li>
                  <li><NavLink to="/homestudios" exact>Home Studios</NavLink></li>
                  <li><NavLink to="/internationalvoiceovers" exact>International Voiceovers</NavLink></li>
                  <li><NavLink to="/kidsteen" exact>Kids & Teen Voices</NavLink></li>
                  <li><NavLink to="/malevoiceovers" exact>Male Voiceovers</NavLink></li>
                  <li><NavLink to="/medicalexplainers" exact>Medical Explainers</NavLink></li>
                  <li><NavLink to="/sportscommentators" exact>Sports Commentators</NavLink></li>
                  <li><NavLink to="/radiobroadcasters" exact>TV & Radio Broadcasters</NavLink></li>
                  <li><NavLink to="/voicegod" exact>TV & Radio BVoice Of God</NavLink></li>
                </ul>
              </li>
              <li>
                <NavLink to="/celebrityvoices" exact>Celebrity Voices</NavLink>
              </li>
              <li>
                <NavLink to="/voicesearch" exact>Voice Search</NavLink>
              </li>
              <li>
                <NavLink to="/shortlist" exact>Shortlist <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.12 9.88005C21.0781 9.74719 20.9996 9.62884 20.8935 9.53862C20.7873 9.4484 20.6579 9.38997 20.52 9.37005L15.1 8.58005L12.67 3.67005C12.6008 3.55403 12.5027 3.45795 12.3853 3.39123C12.2678 3.32451 12.1351 3.28943 12 3.28943C11.8649 3.28943 11.7322 3.32451 11.6147 3.39123C11.4973 3.45795 11.3991 3.55403 11.33 3.67005L8.89999 8.58005L3.47999 9.37005C3.34211 9.38997 3.21266 9.4484 3.10652 9.53862C3.00038 9.62884 2.92186 9.74719 2.87999 9.88005C2.83529 10.0124 2.82846 10.1547 2.86027 10.2907C2.89207 10.4268 2.96124 10.5512 3.05999 10.6501L6.99999 14.4701L6.06999 19.8701C6.04642 20.0091 6.06199 20.1519 6.11497 20.2826C6.16796 20.4133 6.25625 20.5267 6.36999 20.6101C6.48391 20.6912 6.61825 20.7389 6.75785 20.7478C6.89746 20.7566 7.03675 20.7262 7.15999 20.6601L12 18.1101L16.85 20.6601C16.9573 20.7189 17.0776 20.7499 17.2 20.7501C17.3573 20.7482 17.5105 20.6995 17.64 20.6101C17.7537 20.5267 17.842 20.4133 17.895 20.2826C17.948 20.1519 17.9636 20.0091 17.94 19.8701L17 14.4701L20.93 10.6501C21.0305 10.5523 21.1015 10.4283 21.1351 10.2922C21.1687 10.1561 21.1634 10.0133 21.12 9.88005Z" fill="#ffffff"></path> </g></svg></NavLink>
              </li>
              <li>
                <NavLink to="/blog" exact>Blog </NavLink>
              </li>
              <li>
                <span className="search"><svg fill="#ffffff" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M27 24.57l-5.647-5.648a8.895 8.895 0 0 0 1.522-4.984C22.875 9.01 18.867 5 13.938 5 9.01 5 5 9.01 5 13.938c0 4.929 4.01 8.938 8.938 8.938a8.887 8.887 0 0 0 4.984-1.522L24.568 27 27 24.57zm-13.062-4.445a6.194 6.194 0 0 1-6.188-6.188 6.195 6.195 0 0 1 6.188-6.188 6.195 6.195 0 0 1 6.188 6.188 6.195 6.195 0 0 1-6.188 6.188z"></path></g></svg></span>
                <ul>
                  <input type="text" placeholder="search..." />
                </ul>
              </li>              
            </ul>
          </Col>
          <Col md={2}>
            <ul className="rightHeader">
              <li><span><svg fill="#ffffff" width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ionicons-v5-g</title><path d="M478.94,370.14c-5.22-5.56-23.65-22-57.53-43.75-34.13-21.94-59.3-35.62-66.52-38.81a3.83,3.83,0,0,0-3.92.49c-11.63,9.07-31.21,25.73-32.26,26.63-6.78,5.81-6.78,5.81-12.33,4-9.76-3.2-40.08-19.3-66.5-45.78s-43.35-57.55-46.55-67.3c-1.83-5.56-1.83-5.56,4-12.34.9-1.05,17.57-20.63,26.64-32.25a3.83,3.83,0,0,0,.49-3.92c-3.19-7.23-16.87-32.39-38.81-66.52-21.78-33.87-38.2-52.3-43.76-57.52A3.9,3.9,0,0,0,138,32.2,322.35,322.35,0,0,0,82,57.65,338,338,0,0,0,33.35,92a3.83,3.83,0,0,0-1.26,3.74c2.09,9.74,12.08,50.4,43.08,106.72,31.63,57.48,53.55,86.93,100,133.22S252,405.21,309.54,436.84c56.32,31,97,41,106.72,43.07a3.86,3.86,0,0,0,3.75-1.26A337.73,337.73,0,0,0,454.35,430a322.7,322.7,0,0,0,25.45-56A3.9,3.9,0,0,0,478.94,370.14Z"></path></g></svg></span>+44 1753 439 289</li>
              <li>
                <Link to="/contactus" exact>Contact</Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mobileHeader">
          <div className="mehuToggleButton">
            <span className="toggleIcon" onClick={toggleMenu}> <img src="https://greatbritish.b-cdn.net/wp-content//uploads/2024/05/menu_toggel.png" alt="" /></span>
          </div>
          <div className="logoWrap">
            <Link to="/">
              <img src={logoImage} alt="" />
            </Link>
          </div>
          <div className="menuLink">
            <ul>
              <li><NavLink to="/" onClick={closeMenu} exact>Home</NavLink></li>
              <li><NavLink to="/about" onClick={closeMenu} exact>About</NavLink></li>
              <li><NavLink to="/contactus" onClick={closeMenu} exact>Contact</NavLink></li>
            </ul>
          </div>
        </Row>
      </header>
    </>
  );
}
