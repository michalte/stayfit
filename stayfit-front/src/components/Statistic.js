import Navbar from "./Navbar";

import React, {useEffect} from 'react';
import {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

const Statistic = (props) => {
    axios.defaults.withCredentials = true;
    const [userMealsHistory, setUserMealsHistory] = useState([]);
    const [period, setPeriod] = useState(1);
    const [totals, setTotals] = useState({});
    const [recommended, setRecommended] = useState({})
    const [advice, setAdvice] = useState({})

    useEffect(() => {
        document.getElementById("flexRadioDefault1").checked = true;
        axios.get("http://localhost:8080/myMealsHistory", {
            params: {userId: props.loggedUser}
        }).then(response => {
            setUserMealsHistory(response.data);
            console.log(response)
        })
        props.setIdSelectedMeal("");


    }, [])
    useEffect(() => {
        console.log("Period: " + period)
        calculateStatistics();


    }, [period])
    useEffect(() => {
        console.log(totals)


    }, [totals])
    useEffect(() => {
        calculateStatistics();
        console.log(userMealsHistory)

    }, [userMealsHistory]);

    useEffect(() => {
        rightAdvice();
    }, [totals, recommended]);



    function calculateStatistics() {

        let inputMeals = userMealsHistory.slice();
        let recommendedCalories = 0;
        let recommendedProteins = 0;
        let recommendedFats = 0;
        let recommendedCarbo = 0;

        if (period == 1) {
            inputMeals = inputMeals.filter(o => new Date(o.date).getTime() > (new Date().getTime() - 86400000))
            console.log("Odfiltowano z dzisiaj")
            recommendedCalories = 2700*(localStorage.getItem("userBMI")/25);
            recommendedProteins = 100*(localStorage.getItem("userBMI")/25);
            recommendedFats = 80*(localStorage.getItem("userBMI")/25);
            recommendedCarbo = 135*(localStorage.getItem("userBMI")/25);

        }
        if (period == 2) {
            inputMeals = inputMeals.filter(o => new Date(o.date).getTime() > (new Date().getTime() - 604800000))
            console.log("Odfiltowano z 7dni")
            recommendedCalories = (2700*(localStorage.getItem("userBMI")/25))*7;
            recommendedProteins = (100*(localStorage.getItem("userBMI")/25))*7;
            recommendedFats = (80*(localStorage.getItem("userBMI")/25))*7;
            recommendedCarbo = (135*(localStorage.getItem("userBMI")/25))*7;
        }
        if (period == 3) {
            inputMeals = inputMeals.filter(o => new Date(o.date).getTime() > (new Date().getTime() - 2592000000))
            console.log("Odfiltowano z 30 dni")
            recommendedCalories = (2700*(localStorage.getItem("userBMI")/25))*30;
            recommendedProteins = (100*(localStorage.getItem("userBMI")/25))*30;
            recommendedFats = (80*(localStorage.getItem("userBMI")/25))*30;
            recommendedCarbo = (135*(localStorage.getItem("userBMI")/25))*30;
        }
        if (period == 4) {
            console.log("Odfiltowano z całego")
            console.log(Math.round((new Date().getTime() - new Date(userMealsHistory[0].date).getTime())/1000/60/60/24))
            const days = Math.round((new Date().getTime() - new Date(userMealsHistory[0].date).getTime())/1000/60/60/24);
            recommendedCalories = (2700*(localStorage.getItem("userBMI")/25)) * days;
            recommendedProteins = (100*(localStorage.getItem("userBMI")/25))  * days;
            recommendedFats = (80*(localStorage.getItem("userBMI")/25))  * days;
            recommendedCarbo = (135*(localStorage.getItem("userBMI")/25))  * days;
        }

        let totalCalories = 0;
        let totalProteins = 0;
        let totalFats = 0;
        let totalCarbohydrates = 0;

        for(let i=0; i<inputMeals.length; i++){
            inputMeals[i].meal.productList.forEach(o => {
                totalCalories = totalCalories + o.product.calories * (o.productWeight/100);
                totalProteins = totalProteins + o.product.proteins * (o.productWeight/100);
                totalFats = totalFats + o.product.fats * (o.productWeight/100);
                totalCarbohydrates = totalCarbohydrates + o.product.carbohydrates * (o.productWeight/100);
            })
        }
        setTotals({
            totalCalories : totalCalories,
            totalProteins : totalProteins,
            totalFats : totalFats,
            totalCarbohydrates : totalCarbohydrates
        })
        setRecommended({
            recommendedCalories : recommendedCalories,
            recommendedProteins : recommendedProteins,
            recommendedFats : recommendedFats,
            recommendedCarbo : recommendedCarbo
        })
    }
    function rightAdvice(){
        let advCal;
        let advPro;
        let advFat;
        let advCar;

        let toleranceCal = 0;
        let tolerancePro = 0;
        let toleranceFat = 0;
        let toleranceCar = 0;
        if(period==1){
            toleranceCal=200;
            tolerancePro=15;
            toleranceFat=10;
            toleranceCar=20;
        }
        if(period==2){
            toleranceCal=200*7;
            tolerancePro=15*7;
            toleranceFat=10*7;
            toleranceCar=20*7;
        }
        if(period==3){
            toleranceCal=200*30;
            tolerancePro=15*30;
            toleranceFat=10*30;
            toleranceCar=20*30;
        }
        if(period==4){
            toleranceCal=Math.round((new Date().getTime() - new Date(userMealsHistory[0].date).getTime())/1000/60/60/24)*200;
            tolerancePro=Math.round((new Date().getTime() - new Date(userMealsHistory[0].date).getTime())/1000/60/60/24) * 15;
            toleranceFat=Math.round((new Date().getTime() - new Date(userMealsHistory[0].date).getTime())/1000/60/60/24) * 10;
            toleranceCar=Math.round((new Date().getTime() - new Date(userMealsHistory[0].date).getTime())/1000/60/60/24) * 20;}



        if(recommended.recommendedCalories+toleranceCal > totals.totalCalories && recommended.recommendedCalories-toleranceCal < totals.totalCalories)
            advCal = "Prawidłowe odżywianie";
        if(recommended.recommendedCalories-toleranceCal > totals.totalCalories)
            advCal = "Jedz więcej";
        if (recommended.recommendedCalories+toleranceCal < totals.totalCalories)
            advCal = "Jedz mniej";
        if(recommended.recommendedProteins+tolerancePro > totals.totalProteins && recommended.recommendedProteins-tolerancePro < totals.totalProteins)
            advPro = "Prawidłowe odżywianie";
        if(recommended.recommendedProteins-tolerancePro > totals.totalProteins)
            advPro = "Jedz więcej";
        if (recommended.recommendedProteins+tolerancePro < totals.totalProteins)
            advPro = "Jedz mniej";
        if(recommended.recommendedFats+toleranceFat > totals.totalFats && recommended.recommendedFats-toleranceFat < totals.totalFats)
            advFat = "Prawidłowe odżywianie";
        if(recommended.recommendedFats-toleranceFat > totals.totalFats)
            advFat = "Jedz więcej";
        if (recommended.recommendedFats+toleranceFat < totals.totalFats)
            advFat = "Jedz mniej";
        if(recommended.recommendedCarbo+toleranceCar > totals.totalCarbohydrates && recommended.recommendedCarbo-toleranceCar < totals.totalCarbohydrates)
            advCar = "Prawidłowe odżywianie";
        if(recommended.recommendedCarbo-toleranceCar > totals.totalCarbohydrates)
            advCar = "Jedz więcej";
        if (recommended.recommendedCarbo+toleranceCar < totals.totalCarbohydrates)
            advCar = "Jedz mniej";

        setAdvice({
            advCal : advCal,
            advCar : advCar,
            advFat : advFat,
            advPro : advPro
        })
    }

    function updatePeriod(e) {
        setPeriod(e.target.value);
        console.log("update period")
    }

    return (
        <div>
            <Navbar setLoggedUser={props.setLoggedUser} setLoggedIn={props.setLoggedIn}/>
            <article style={{display: 'flex', flexDirection: 'column', height: '71.5vh'}} id="noBackgroundNav">
                <h2 style={{textAlign: "center"}}>Statystyki </h2>
                <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '3vh', marginBottom: '3vh'}}>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" onChange={updatePeriod}
                               value={1}
                               id="flexRadioDefault1"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Dzisiaj
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" onChange={updatePeriod}
                               value={2}
                               id="flexRadioDefault2"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Ten tydzień
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" onChange={updatePeriod}
                               value={3}
                               id="flexRadioDefault3"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Ten miesiąc
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" onChange={updatePeriod}
                               value={4}
                               id="flexRadioDefault4"
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Ogólnie
                        </label>
                    </div>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Typ</th>
                        <th scope="col">Przyjęte</th>
                        <th scope="col">Zalecane</th>
                        <th scope="col">Różnica</th>
                        <th scope="col">Rada</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">Kalorie (kcal)</th>
                        <td>{totals.totalCalories}</td>
                        <td>{Math.round(recommended.recommendedCalories)}</td>
                        <td>{Math.round(totals.totalCalories - recommended.recommendedCalories)}</td>
                        <td>{advice.advCal}</td>
                    </tr>
                    <tr>
                        <th scope="row">Białka (g)</th>
                        <td>{Math.round(totals.totalProteins)}</td>
                        <td>{Math.round(recommended.recommendedProteins)}</td>
                        <td>{Math.round(totals.totalProteins - recommended.recommendedProteins)}</td>
                        <td>{advice.advPro}</td>
                    </tr>
                    <tr>
                        <th scope="row">Tłuszcze (g)</th>
                        <td>{Math.round(totals.totalFats)}</td>
                        <td>{Math.round(recommended.recommendedFats)}</td>
                        <td>{Math.round(totals.totalFats - recommended.recommendedFats)}</td>
                        <td>{advice.advFat}</td>
                    </tr>
                    <tr>
                        <th scope="row">Węglowodany (g)</th>
                        <td>{Math.round(totals.totalCarbohydrates)}</td>
                        <td>{Math.round(recommended.recommendedCarbo)}</td>
                        <td>{Math.round(totals.totalCarbohydrates - recommended.recommendedCarbo)}</td>
                        <td>{advice.advCar}</td>
                    </tr>
                    </tbody>
                </table>
                <span
                    style={{marginTop: '3vh', textAlign: 'center'}}>Statystyki obliczane dla Twojego BMI wynoszącego: {localStorage.getItem('userBMI')}</span>
            </article>
        </div>
    )
}

export default Statistic;
