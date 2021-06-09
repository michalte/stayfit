import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";

const Login = (props) => {
    axios.defaults.withCredentials = true;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const [notification, setNotification] = useState();

    function updateUsername(e){
        setUsername(e.target.value)
    }

    function updatePassword(e){
        setPassword(e.target.value)
    }

    function logIn(){
        const res = axios.post('http://localhost:8080/logIn', {
            username
        }, {
            headers:{
                "Authorization": "Basic " + window.btoa(username + ":" + password)
            }
/*            auth:{
                username: username,
                password: password
            }*/
        }).then(response => {
                console.log(response);
                console.log(props);
                localStorage.setItem('ifSession', "true");
                props.setLoggedIn(localStorage.getItem('ifSession'));
                localStorage.setItem('user', window.btoa('' + response.data.id))
                localStorage.setItem('userBMI', response.data.userBMI)
                props.setLoggedUser(window.atob('' + localStorage.getItem("user")));
        }
        ).catch(err => {
            setNotification('Błędne hasło lub login');
        });
    }

    useEffect(() => {
        if(history !== undefined) {
            if (props.loggedIn === 'true') history.push('/products');
            if (props.loggedIn === 'false') history.push('/logIn');
        }
    },[props.loggedIn]);


    return(
        <article style={{paddingTop: '5%', display: 'flex', justifyContent: 'center', marginTop: '10vh', marginBottom: '25vh'}}>
            <form style={{height: '41.5vh', paddingTop: '5vh'}}>
                <h2 style={{marginBottom: '10%', textAlign: 'center'}}><Link to="/history">Zaloguj się</Link></h2>
                <input style={{display: 'block', margin: '1vh auto'}} type="text" id="login" className="fadeIn second form-control" name="login" placeholder="login" onChange={updateUsername}/>
                <input style={{display: 'block', margin: '1vh auto'}} type="password" id="password" className="fadeIn third form-control" name="login" placeholder="hasło" onChange={updatePassword}/>
                <input style={{display: 'block', margin: '1vh auto'}} type="button" className="btn btn-outline-dark" defaultValue="Zaloguj" onClick={logIn} />
                <div>
                    <span style={{display: 'block', margin: '0 auto', textAlign: 'center'}}><Link to="/register">Zarejestruj się</Link></span>
                    <span style={{display: 'block', margin: '0 auto', textAlign: 'center'}}>Zapomniałeś hasła?</span>
                </div>
                <span style={{color: 'red', fontWeight: 'bold', display: 'block', textAlign: 'center'}}>{notification}</span>
            </form>
        </article>
    )
}

export default Login;
