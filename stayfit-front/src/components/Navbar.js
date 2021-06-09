import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Navbar = (props) => {
    function logOut(){
        props.setLoggedIn(false)
        axios.get("http://localhost:8080/logout");
        localStorage.setItem('ifSession', 'false');
        props.setLoggedIn(localStorage.getItem('ifSession'));
        localStorage.setItem('user', '');
        props.setLoggedUser(localStorage.getItem('user'));
        localStorage.setItem('userBMI', '');

    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" id="noBackgroundNav">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" id="btnid">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarNavDropdown">
                <ul className="navbar-nav justify-content-sm-around " id="centerNav">
                    <li className="nav-item dropdown menuBtn" id="btnid">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="btnid">
                            POSIŁKI
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item"><Link to="/createMeal">STWÓRZ POSIŁEK</Link></a>
                            <a className="dropdown-item"><Link to="/yourMeals">MOJE POSIŁKI</Link></a>
                            <a className="dropdown-item"><Link to="/history">HISTORIA POSIŁKÓW</Link></a>
                        </div>
                    </li>
                    <li className="nav-item menuBtn" id="btnid">
                        <a className="nav-link" href="#" id="btnid"><Link to="/statistic">STATYSTYKI</Link></a>
                    </li>
                    <li className="nav-item menuBtn" id="btnid">
                        <a className="nav-link" href="#" id="btnid"><Link to="/products">PRODUKTY</Link></a>
                    </li>
                    <li className="nav-item menuBtn" id="btnid">
                        <a className="nav-link" href="#" id="btnid"><Link to="/calculatorBMI">KALKULATOR BMI</Link></a>
                    </li>
                    <li className="nav-item logOutBtn" id="btnidWlg">
                        <a className="nav-link" href="#" id="btnidWlg" onClick={logOut}><Link to="/login">WYLOGUJ</Link></a>
                    </li>

                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
