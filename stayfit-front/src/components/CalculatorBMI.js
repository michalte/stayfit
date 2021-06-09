import React, {useEffect} from 'react';
import Navbar from "./Navbar";
import {useState} from "react";
import axios from "axios";

const CalculatorBMI = (props) => {

    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [notification, setNotification] = useState("")
    const [confirmation, setConfirmation] = useState("")

    function updateUserBmi(){
        var bmi = (weight / (height / 100 * height / 100));
        bmi = Math.round(bmi * 100) / 100;
        axios.put("http://localhost:8080/updateUserBmi", {
            userId: props.loggedUser, userBmi: bmi
        }).then(response => {
            console.log("ZAKTUALIZOWANO BMI")
        }).catch(err => console.log(err))
        localStorage.setItem("userBMI", bmi)
        setConfirmation("Zaktualizowano BMI")
        setTimeout(()=> {
            setConfirmation("")
        }, 3000)
    }

    function updateHeight(e){
        setHeight(e.target.value)
    }
    function updateWeight(e){
        setWeight(e.target.value)
    }
    useEffect(() => {
            props.setIdSelectedMeal("");
        },
        []
    )
    function calculateBMI(){
        var bmi = (weight / (height / 100 * height / 100));
        bmi = Math.round(bmi * 100) / 100;
        if (bmi > 0 && bmi <= 18.50){
            setNotification("Twoje BMI wynosi: " + bmi + " - niedowaga") ;
        }
        else if (bmi > 18.5 && bmi <= 24.99) {
            setNotification("Twoje BMI wynosi: " + bmi + " - normalna waga");
        }
        else if (bmi >= 25 && bmi <= 29.99){
            setNotification("Twoje BMI wynosi: " + bmi + " - nadwaga");
        }
        else if (bmi >= 30 && bmi <= 34.99) {
            setNotification("Twoje BMI wynosi: " + bmi + " - I stopień otyłości");
        }
        else if (bmi >= 35 && bmi <= 39.99){
            setNotification("Twoje BMI wynosi: " + bmi + " - II stopień otyłości");
        }
        else if(bmi >= 40 && bmi <= 70){
            setNotification("Twoje BMI wynosi: " + bmi + " - skrajna otyłość");
        }else {
            setNotification("Błędne dane!");
        }
        return bmi;
    }

    return (
        <div>
            <Navbar setLoggedUser={props.setLoggedUser} setLoggedIn={props.setLoggedIn}/>
            <article style={{paddingTop:"3vh", marginTop:"2vh", marginBottom:"10vh", height:"61.5vh"}}>
                <form role="form" style={{width: '30%', margin: '20px auto'}}>
                    <h2 style={{textAlign:"center"}}>Kalkulator BMI </h2>
                    <div id="metric" ng-show="units == 'metric'">
                        <div className="form-group" style={{textAlign:"center"}}>
                            <label htmlFor="weight_kg">Waga (kg):</label>
                            <input type="number" ng-model="weight_kg" id="weight_kg" placeholder="waga w kg"
                                   className="form-control" onChange={updateWeight}/>
                        </div>
                        <div className="form-group" style={{textAlign:"center"}}>
                            <label htmlFor="height_cm">Wzrost (cm):</label>
                            <input type="number" ng-model="height_cm" id="height_cm" placeholder="wzrost w cm"
                                   className="form-control" onChange={updateHeight}/>
                        </div>
                        <button type="button" className="btn btn-outline-dark form-control" onClick={calculateBMI} style={{marginBottom:"2vh"}}>OBLICZ BMI</button>
                        <span style={{ fontWeight: 'bold', display: 'block', textAlign: 'center', marginBottom: '10px'}}>{notification}</span>
                        {notification != "Błędne dane!" && notification ? <button type="button" className="btn btn-outline-dark form-control" onClick={updateUserBmi}>Zapisz w profilu</button> : null}
                        <div id="bmiResult"/>
                        <span style={{ textAlign: 'center', display: 'block', marginTop: '10px'}}>{confirmation}</span>
                    </div>
                </form>
            </article>
        </div>
    )
}

export default CalculatorBMI;