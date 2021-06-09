import React, {useEffect, useReducer, useState} from 'react';
import Navbar from "./Navbar";
import axios from "axios";
import MealsList from "./MealsList";
import FilterBar from "./FilterBar";

const YourMeals = (props) => {
    axios.defaults.withCredentials = true;
    const [userMeals, setUserMeals] = useState([]);
    const categories = ["Nazwa","Kalorie (rosnąco)","Kalorie (malejąco)", "Białka (rosnąco)", "Białka (malejąco)", "Tłuszcze (rosnąco)", "Tłuszcze (malejąco)", "Węglowodany (rosnąco)", "Węglowodany (malejąco)"];
    const [categoryFilter, setCategoryFilter] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [mealsBackupList, setMealsBackupList] = useState([]);
    const [totals, setTotals] = useState([]);
    const [sortedMeals, setSortedMeals] = useState();



    useEffect(() => {
        axios.get("http://localhost:8080/myMeals", {
            params: {userId: props.loggedUser}
        }).then(response => {
            setUserMeals(response.data);
            setMealsBackupList(response.data);
        })
    },[])

    useEffect(() => {
    }, [userMeals]);


    useEffect( () => {
        sortMeals();
    }, [categoryFilter])

    useEffect( () => {
        sortMeals();
    }, [filterValue])

    useEffect( () => {
        document.getElementById("inputForNameFiltering").value = props.idSelectedMeal;
        setFilterValue(props.idSelectedMeal);
    }, [props.idSelectedMeal])

    useEffect(() => {
        sortMeals();
    }, [mealsBackupList])


    function sortMeals(){
/*        if(totals.length === userMeals.length) {*/

            let tempTable = mealsBackupList.slice();

            if (categoryFilter === "Nazwa") {
                tempTable = tempTable.filter(o => o.name.includes(filterValue) || o.mealId === filterValue);
                tempTable = tempTable.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
                setUserMeals(tempTable);
            }
            if (categoryFilter === "Kalorie (rosnąco)") {
                tempTable = tempTable.filter(o => o.name.includes(filterValue) || o.mealId === filterValue);
                const totals = createTotals(tempTable);
                tempTable = tempTable.sort((a, b) => {
                    if (totals[tempTable.indexOf(a)].totalCalories > totals[tempTable.indexOf(b)].totalCalories) return 1;
                    if (totals[tempTable.indexOf(a)].totalCalories < totals[tempTable.indexOf(b)].totalCalories) return -1;
                    return 0;
                })
                setUserMeals(tempTable);
            }
            if (categoryFilter === "Białka (rosnąco)") {
                tempTable = tempTable.filter(o => o.name.includes(filterValue) || o.mealId === filterValue);
                const totals = createTotals(tempTable);
                    tempTable = tempTable.sort((a, b) => {
                    if (totals[tempTable.indexOf(a)].totalProteins > totals[tempTable.indexOf(b)].totalProteins) return 1;
                    if (totals[tempTable.indexOf(a)].totalProteins < totals[tempTable.indexOf(b)].totalProteins) return -1;
                    return 0;
                })
                setUserMeals(tempTable);
            }
            if (categoryFilter === "Tłuszcze (rosnąco)") {
                tempTable = tempTable.filter(o => o.name.includes(filterValue) || o.mealId === filterValue);
                const totals = createTotals(tempTable);
                tempTable = tempTable.sort((a, b) => {
                    if (totals[tempTable.indexOf(a)].totalFats > totals[tempTable.indexOf(b)].totalFats) return 1;
                    if (totals[tempTable.indexOf(a)].totalFats < totals[tempTable.indexOf(b)].totalFats) return -1;
                    return 0;
                })
                setUserMeals(tempTable);
            }
            if (categoryFilter === "Węglowodany (rosnąco)") {
                tempTable = tempTable.filter(o => o.name.includes(filterValue) || o.mealId === filterValue);
                const totals = createTotals(tempTable);
                tempTable = tempTable.sort((a, b) => {
                    if (totals[tempTable.indexOf(a)].totalCarbohydrates > totals[tempTable.indexOf(b)].totalCarbohydrates) return 1;
                    if (totals[tempTable.indexOf(a)].totalCarbohydrates < totals[tempTable.indexOf(b)].totalCarbohydrates) return -1;
                    return 0;
                })
                setUserMeals(tempTable);
            }
            if (categoryFilter === "Kalorie (malejąco)") {
                tempTable = tempTable.filter(o => o.name.includes(filterValue) || o.mealId === filterValue);
                const totals = createTotals(tempTable);
                tempTable = tempTable.sort((a, b) => {
                    if (totals[tempTable.indexOf(a)].totalCalories > totals[tempTable.indexOf(b)].totalCalories) return -1;
                    if (totals[tempTable.indexOf(a)].totalCalories < totals[tempTable.indexOf(b)].totalCalories) return 1;
                    return 0;
                })
                setUserMeals(tempTable);
            }
            if (categoryFilter === "Białka (malejąco)") {
                tempTable = tempTable.filter(o => o.name.includes(filterValue) || o.mealId === filterValue);
                const totals = createTotals(tempTable);
                tempTable = tempTable.sort((a, b) => {
                    if (totals[tempTable.indexOf(a)].totalProteins > totals[tempTable.indexOf(b)].totalProteins) return -1;
                    if (totals[tempTable.indexOf(a)].totalProteins < totals[tempTable.indexOf(b)].totalProteins) return 1;
                    return 0;
                })
                setUserMeals(tempTable);
            }
            if (categoryFilter === "Tłuszcze (malejąco)") {
                tempTable = tempTable.filter(o => o.name.includes(filterValue) || o.mealId === filterValue);
                const totals = createTotals(tempTable);
                tempTable = tempTable.sort((a, b) => {
                    if (totals[tempTable.indexOf(a)].totalFats > totals[tempTable.indexOf(b)].totalFats) return -1;
                    if (totals[tempTable.indexOf(a)].totalFats < totals[tempTable.indexOf(b)].totalFats) return 1;
                    return 0;
                })
                setUserMeals(tempTable);
            }
            if (categoryFilter === "Węglowodany (malejąco)") {
                tempTable = tempTable.filter(o => o.name.includes(filterValue) || o.mealId === filterValue);
                const totals = createTotals(tempTable);
                tempTable = tempTable.sort((a, b) => {
                    if (totals[tempTable.indexOf(a)].totalCarbohydrates > totals[tempTable.indexOf(b)].totalCarbohydrates) return -1;
                    if (totals[tempTable.indexOf(a)].totalCarbohydrates < totals[tempTable.indexOf(b)].totalCarbohydrates) return 1;
                    return 0;
                })
                setUserMeals(tempTable);
            }
            if (categoryFilter === "") {
                if (mealsBackupList !== undefined) {
                    tempTable = tempTable.filter(o => o.name.includes(filterValue) || o.mealId === filterValue);
                    setUserMeals(tempTable);
                }
            }
     //   }
    }

    function createTotals(arr){
        if(arr !== undefined) {
            let tempTable = [];
            arr.forEach(o => {
                let calories = 0;
                let weight = 0;
                let proteins = 0;
                let fats = 0;
                let carbohydrates = 0;
                arr[arr.indexOf(o)].productList.forEach(o => {
                    calories = calories + o.product.calories;
                    weight = weight + o.productWeight;
                    proteins = proteins + o.product.proteins;
                    fats = fats + o.product.fats;
                    carbohydrates = carbohydrates + o.product.carbohydrates;
                })
                tempTable.push({
                    totalCalories: Math.round(calories),
                    totalWeight: weight,
                    totalProteins: Math.round(proteins),
                    totalFats: Math.round(fats),
                    totalCarbohydrates: Math.round(carbohydrates)
                });
            })
            return tempTable;
        }
    }


    return (
        <div>
            <Navbar setLoggedUser={props.setLoggedUser} setLoggedIn={props.setLoggedIn}/>
                <FilterBar categories={categories} setFilterValue={setFilterValue} setCategoryFilter={setCategoryFilter}></FilterBar>
                <article style={{display: 'flex', flexDirection: 'column', height: '71.5vh' }} id="noBackgroundNav">
                    <h2 style={{textAlign: 'center'}}> Moje posiłki </h2>
                    <div className="tab invisible-scrollbar">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col" style={{borderRadius: '30px 0 0 30px'}}>#</th>
                                <th scope="col">Nazwa</th>
                                <th scope="col">Kaloryczność (kcal)</th>
                                <th scope="col">Waga (g)</th>
                                <th scope="col">Białka (g)</th>
                                <th scope="col">Tłuszcze (g)</th>
                                <th scope="col">Węglowodany (g)</th>
                                <th></th>
                                <th scope="col" style={{borderRadius: '0 30px 30px 0'}} />
                            </tr>
                            </thead>
                            <tbody>
                            <MealsList setTotals={setTotals} userMeals={userMeals} loggedUser={props.loggedUser} setUserMeals={setUserMeals}/>
                            </tbody>
                        </table>
                    </div>
                </article>

        </div>
    )
}

export default YourMeals;
