import React from 'react';
import logo from "../logo.png";

const Header = () => {
    return(
        <header>
            <a href="mainPage.html"><img src={logo} alt={logo}/></a>
        </header>
    )
}

export default Header;