import React, {useEffect, useState} from 'react';
import axios from "axios";


const MealsList = (props) => {
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState([]);
    const [valuesTable, setValuesTable] = useState(props.userMeals.map(o => false));
    useEffect(() => {
       if(props.userMeals !== undefined) {
           let tempTable = [];
           props.userMeals.forEach(o => {
               let calories = 0;
               let weight = 0;
               let proteins = 0;
               let fats = 0;
               let carbohydrates = 0;
               props.userMeals[props.userMeals.indexOf(o)].productList.forEach(o => {
                   calories = calories + o.product.calories * (o.productWeight/100);
                   weight = weight + o.productWeight;
                   proteins = proteins + o.product.proteins * (o.productWeight/100);
                   fats = fats + o.product.fats * (o.productWeight/100);
                   carbohydrates = carbohydrates + o.product.carbohydrates * (o.productWeight/100);
               })
               tempTable.push({
                   totalCalories: Math.round(calories),
                   totalWeight: weight,
                   totalProteins: Math.round(proteins),
                   totalFats: Math.round(fats),
                   totalCarbohydrates: Math.round(carbohydrates)
               });
           })
           setValues(tempTable);
           props.setTotals(tempTable);
       }
    },[props.userMeals])

    useEffect(() => {
    }, [values]);

    function openDetails(index){
        if(valuesTable[index] === false){
            const tempTable = valuesTable.slice();
            tempTable[index] = true;
            setValuesTable(tempTable);
        }else{
            const tempTable = valuesTable.slice();
            tempTable[index] = false;
            setValuesTable(tempTable);
        }
    }

    function eatMeal(index){
        axios.post("http://localhost:8080/eatMeal", ({
            date : Date.now() + 7200000,
            owner : {
                id : props.loggedUser
            },
            meal : {
                mealId : props.userMeals[index].mealId
            }
    })
        )
        let x = Date;
        console.log(x)
    }

    function deleteMeal(index){
        axios.put("http://localhost:8080/deleteMeal", {
            mealId : props.userMeals[index].mealId
        })
        props.setUserMeals(props.userMeals.filter(o => o !== props.userMeals[index]))
    }


    return (
        values.length > 0 && values.length === props.userMeals.length ?
        <React.Fragment>
            {props.userMeals.map((meal, index) =>
                <React.Fragment>
                    <tr style={{cursor: "pointer"}}>
                    <th scope="row">{index+1}</th>
                    <td style={{fontWeight:"bold"}} onClick={() => openDetails(index)}>{meal.name}</td>
                    <td>{values[index].totalCalories}</td>
                    <td>{values[index].totalWeight}</td>
                    <td>{values[index].totalProteins}</td>
                    <td>{values[index].totalFats}</td>
                    <td>{values[index].totalCarbohydrates}</td>
                    <td><button className="btn btn-outline-dark form-control" onClick={() => eatMeal(index)}>Zjedz</button></td>
                    <td><button className="btn btn-outline-danger form-control" onClick={() => deleteMeal(index)}>Usuń</button></td>
                </tr>
                    {valuesTable[index] ?
                        <React.Fragment>
                            {meal.productList.map((ingredient) =>
                        <tr style={{background: "rgba(255, 255, 255, 0.25)"}}>
                        <th scope="row"></th>
                        <td>{ingredient.product.name}</td>
                        <td>{ingredient.product.calories * (ingredient.productWeight/100)}</td>
                        <td>{ingredient.productWeight}</td>
                        <td>{ingredient.product.proteins * (ingredient.productWeight/100)}</td>
                        <td>{ingredient.product.fats * (ingredient.productWeight/100)}</td>
                        <td>{ingredient.product.carbohydrates * (ingredient.productWeight/100)}</td>
                        <td></td>
                        <td></td>
                        </tr>
                            )}
                        </React.Fragment> : null
                }
                </React.Fragment>
            )}
        </React.Fragment> :
            <span id="alert">
                Wybrany posiłek nie widnieje na Twojej liście!
            </span>
    )
}

export default MealsList;
