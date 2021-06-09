import './App.css';
import Header from "./components/Header";
import Products from "./components/Products";
import Footer from "./components/Footer";
import CreateMeal from "./components/CreateMeal";
import History from "./components/History";
import YourMeals from "./components/YourMeals";
import Login from "./components/Login";
import Register from "./components/Register";
import CalculatorBMI from "./components/CalculatorBMI";
import Statistic from "./components/Statistic";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useState} from "react";
import { Redirect } from "react-router-dom";

function App() {

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('ifSession'));
    const [loggedUser, setLoggedUser] = useState(window.atob('' + localStorage.getItem("user")));
    const [idSelectedMeal, setIdSelectedMeal] = useState(undefined);

    return (
        <Router>
            <div className='container'>
                <Header/>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    {/*<Route path="/register" component={Register}/>*/}
                    <Route path="/register" component={() => (
                        loggedIn === 'false' ? (
                            <Register setLoggedIn={setLoggedIn}/> ) : (
                            <Redirect to="/login"/>
                        )
                    )}/>
                    <Route path="/login" component={() => (
                        <Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
                    )}/>
                    <Route path="/yourMeals" component={() => (
                        loggedIn === 'true' ? (
                        <YourMeals loggedUser={loggedUser} setLoggedUser={setLoggedUser} setLoggedIn={setLoggedIn} idSelectedMeal={idSelectedMeal} setIdSelectedMeal={setIdSelectedMeal} /> ) : (
                            <Redirect to="/login"/>
                        )
                    )}/>
                    <Route path="/createMeal" component={() => (
                        loggedIn === 'true' ? (
                        <CreateMeal loggedUser={loggedUser} setLoggedUser={setLoggedUser} setLoggedIn={setLoggedIn} setIdSelectedMeal={setIdSelectedMeal}/>) : (
                            <Redirect to="/login"/>
                    )
                    )}/>
                    <Route path="/history" component={() => (
                        loggedIn === 'true' ? (
                        <History setLoggedUser={setLoggedUser} setLoggedIn={setLoggedIn} loggedUser={loggedUser} setIdSelectedMeal={setIdSelectedMeal}/>) : (
                            <Redirect to="/login"/>
                        )
                    )}/>
                    <Route path="/products" component={() => (
                        loggedIn === 'true' ? (
                        <Products setLoggedUser={setLoggedUser} setLoggedIn={setLoggedIn} setIdSelectedMeal={setIdSelectedMeal}/>) : (
                        <Redirect to="/login"/>
                        )
                    )}/>
                    <Route path="/calculatorBMI" component={() => (
                        loggedIn === 'true' ? (
                        <CalculatorBMI setLoggedUser={setLoggedUser} setLoggedIn={setLoggedIn} setIdSelectedMeal={setIdSelectedMeal} loggedUser={loggedUser}/>) : (
                        <Redirect to="/login"/>
                        )
                    )}/>
                    <Route path="/statistic" component={() => (
                        loggedIn === 'true' ? (
                            <Statistic setLoggedUser={setLoggedUser} setLoggedIn={setLoggedIn} setIdSelectedMeal={setIdSelectedMeal} loggedUser={loggedUser}/>) : (
                            <Redirect to="/login"/>
                        )
                    )}/>
                </Switch>
                <Footer/>
            </div>
        </Router>
    )
}

export default App;
