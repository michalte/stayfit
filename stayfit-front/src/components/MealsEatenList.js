import React from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";


const MealsEatenList = (props) => {

    const history = useHistory();
    function deleteEatenMeal(index){
        axios.put("http://localhost:8080/deleteEatenMeal", {
            mealEatenId : props.userMealsHistory[index].mealEatenId
        })
        props.setUserMealsHistory(props.userMealsHistory.filter(o => o !== props.userMealsHistory[index]))
    }

    function showDetails(index){
        props.setIdSelectedMeal(props.userMealsHistory[index].meal.mealId);
        history.push("/yourMeals");
    }



    return(
        <React.Fragment>
            {props.userMealsHistory.map((mealEaten, index) =>
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{mealEaten.meal.name}</td>
                    <td onClick={() => showDetails(index)} style={{cursor: "pointer"}}>🔗</td>
                    <td>{mealEaten.date.substring(0, 10)} {mealEaten.date.substring(11,19)}</td>
                    <td><label type="submit" className="btn btn-outline-dark" onClick={() => deleteEatenMeal(index)}>Usuń</label></td>
                </tr>
            )}
        </React.Fragment>
    )
}

export default MealsEatenList;