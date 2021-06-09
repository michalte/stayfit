import React, {useEffect} from 'react';
import Navbar from "./Navbar";
import MealsEatenList from "./MealsEatenList";
import {useState} from "react";
import axios from "axios";

const History = (props) => {
    axios.defaults.withCredentials = true;
    const [userMealsHistory, setUserMealsHistory] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/myMealsHistory", {
            params: {userId: props.loggedUser}
        }).then(response => {
            setUserMealsHistory(response.data);
            console.log(response)
        })
        props.setIdSelectedMeal("");

    },[])

    return (
        <div>
            <Navbar setLoggedUser={props.setLoggedUser} setLoggedIn={props.setLoggedIn}/>
                <article style={{display: 'flex', flexDirection: 'column', height: '71.5vh'}} id="noBackgroundNav">
                    <h2 style={{textAlign: 'center'}}> Historia posiłków </h2>
                    <div className="tab invisible-scrollbar">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col" style={{borderRadius: '30px 0 0 30px'}}>#</th>
                                <th scope="col">Nazwa</th>
                                <th scope="col">🔗</th>
                                <th scope="col">Data i godzina</th>
                                <th scope="col" style={{borderRadius: '0 30px 30px 0'}} />
                            </tr>
                            </thead>
                            <tbody>
                            <MealsEatenList userMealsHistory={userMealsHistory} setUserMealsHistory={setUserMealsHistory} setIdSelectedMeal={props.setIdSelectedMeal}/>
                            </tbody>
                        </table>
                    </div>
                </article>
        </div>
    )
}

export default History;