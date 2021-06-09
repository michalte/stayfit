import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";
import plus from "../plus.png";
import minus from "../minus.png"
import AddIngredientComponent from "./AddIngredientComponent";
import axios from "axios";
import {ProductWithWeight} from "./models/ProductWithWeight";
import {Product} from "./models/Product";

const CreateMeal = (props) => {
    axios.defaults.withCredentials = true;
    const [tableOfIngredients, setTableOfIngredients] = useState(["xd"]);
    const [ingredients, setIngredients] = useState([]);
    const [options, setOptions] = useState();
    const [summaryTableValues, setSummaryTableValues] = useState({
        totalCalories: 0,
        totalProteins: 0,
        totalFats: 0,
        totalCarbohydrates: 0
    });
    const [weights, setWeights] = useState([]);
    const [name, setName] = useState();
    const [createdMeal, setCreatedMeal] = useState();



    function addIngredient(){
        let table = tableOfIngredients.slice();
        table.push("xd");
        setTableOfIngredients(table);
    }

    function removeIngredient(){
        let table = tableOfIngredients.slice();
        table.pop();
        setTableOfIngredients(table);
        let tempTable = ingredients.slice();
        if(table.length+1 === tempTable.length) tempTable.pop();
        setIngredients(tempTable);
        let tempWeights = weights.slice();
        if(table.length+1 === tempWeights.length) tempWeights.pop();
        setWeights(tempWeights);
    }

    useEffect(() => {
        props.setIdSelectedMeal("");
    }, [])

/*    function createMeal(){
        let productWeightList = ingredients.map(o => new ProductWithWeight(new Product(o.value), weights[ingredients.indexOf(o)]))
        console.log("FLAGA")
        console.log(productWeightList)
        axios.post("http://localhost:8080/meals", {
            name: name,
            date: "1997-04-23",
            owner: {
                id: 9
            },
            productList: productWeightList
    })
}*/
/*    function createMeal(){
        let productWeightList = ingredients.map(o => ({product: {productId: o.value}, productWeight: weights[ingredients.indexOf(o)]}))
        axios.post("http://localhost:8080/meals", {
                name: name,
                date: "1997-04-23",
                owner: {
                    id: 9
                },
                productList: [
                    {
                        product: {
                            productId: 9
                        },
                        productWeight: "200.0"
                    }
                        ]
            }
        )
    }*/

    function checkIfArrayHadDuplicates(array){
        for(let i = 0; i<array.length; i++){
            for(let j = i+1; j<array.length; j++){
                if(array[i] === array[j]){
                   return true;
                }
            }
        }
        return false;
    }

    function createMeal() {
        console.log(ingredients);
        console.log("----------");
        console.log(weights);
        if(ingredients.length === weights.length && ingredients.length > 0 && weights.length > 0 && name !== undefined && !checkIfArrayHadDuplicates(ingredients)) {
            if(!ingredients.includes(undefined) && !weights.includes("")) {
                let productWeightList = ingredients.map(o => ({
                    product: {productId: o.value},
                    meal: null,
                    productWeight: weights[ingredients.indexOf(o)]
                }))
/*                let productWeightList = [];
                for(let i = 0; i<ingredients.length; i++){
                    productWeightList.push({
                        product: {productId: ingredients[i].value},
                        meal: null,
                        productWeight: weights[i]
                })}
                console.log("PRODUCTWEIGHTLIST")
                console.log(productWeightList)*/
                axios.post("http://localhost:8080/addMeal", {
                        name: name,
                        date: new Date(),
                        owner: {
                            id: props.loggedUser
                        },
                        productList: productWeightList
                    }
                )
                setCreatedMeal("Pomyślnie utworzono posiłek!");
            }else{setCreatedMeal("Formularz zawiera niepoprawne wartości!");}
        }else{setCreatedMeal("Formularz zawiera niepoprawne wartości!");}
    }

    function updateName(e){
        setName(e.target.value);
    }

    function updateSummaryTable(){
        let tempTable = summaryTableValues;
        if(ingredients.length === weights.length) {
            let totalCalories = 0;
            ingredients.forEach(o => totalCalories = (o.calories*(weights[ingredients.indexOf(o)]/100)) + totalCalories)
            let totalProteins = 0;
            ingredients.forEach(o => totalProteins = (o.proteins*(weights[ingredients.indexOf(o)]/100)) + totalProteins)
            let totalFats = 0;
            ingredients.forEach(o => totalFats = (o.fats*(weights[ingredients.indexOf(o)]/100)) + totalFats)
            let totalCarbohydrates = 0;
            ingredients.forEach(o => totalCarbohydrates = (o.carbohydrates*(weights[ingredients.indexOf(o)]/100)) + totalCarbohydrates)

        setSummaryTableValues({
            totalCalories: Math.round(totalCalories),
            totalProteins: Math.round(totalProteins),
            totalFats: Math.round(totalFats),
            totalCarbohydrates: Math.round(totalCarbohydrates)
        })
        }
    }

    useEffect(() => {
        console.log(ingredients)
        updateSummaryTable();
        },
        [ingredients])

    useEffect(() => {
        console.log("NAZWA POSILKU TO : " + name)
    }, [name])

    useEffect(() => {
        let one = "http://localhost:8080/products"
        const requestOne = axios.get(one);
        axios.all([requestOne]).then(axios.spread((...responses) => {
            const responseOne = responses[0].data;
            let options = responseOne.map(o => {
             return {value: o.productId, label: o.name, calories: o.calories, proteins: o.proteins, fats: o.fats, carbohydrates: o.carbohydrates, group: o.group}
            })
            setOptions(options);
        })).catch(errors => {
        })
    }, [])

    useEffect( () => {
    }, [options])

    useEffect( () => {
        console.log("WYSWIETLANE WEIGHTS")
        console.log(weights);
        updateSummaryTable();
    }, [weights])


    return (
        <div>
            <Navbar setLoggedUser={props.setLoggedUser} setLoggedIn={props.setLoggedIn}/>
            <article style={{marginTop: '2vh'}}>
                <form className="form-group formCreateMeal" style={{height: '60vh'}}>
                    <h2>Stwórz posiłek</h2>
                    <input onChange={updateName} type="text" className="form-control" style={{marginBottom: "1vh"}} placeholder="Nazwa"/>
                    {/*<div className="flexBoxWrapperCreateMeal">*/}
                    {/*    <div className="dropdown " style={{flexBasis: "60%"}}>*/}
                    {/*        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"*/}
                    {/*                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"*/}
                    {/*                style={{width: "100%"}}>*/}
                    {/*            Produkt*/}
                    {/*        </button>*/}
                    {/*        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">*/}
                    {/*            <a className="dropdown-item" href="#">xD</a>*/}
                    {/*            <a className="dropdown-item" href="#">Ser</a>*/}
                    {/*            <a className="dropdown-item" href="#">Burrito</a>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <input type="number" style={{flexBasis: "30%", marginLeft: "5%"}} className="form-control"*/}
                    {/*           placeholder="Waga (g)"*/}
                    {/*           step="10"/>*/}
                    {/*</div>*/}
                    {tableOfIngredients.map((e, index) =>   <AddIngredientComponent weights={weights} setWeights={setWeights} summaryTableValues={summaryTableValues} setSummaryTableValues={setSummaryTableValues} options={options} index={index} ingredients={ingredients} setIngredients={setIngredients}/>)}
                    <img id="plusIcon" src={plus} onClick={addIngredient} style={{cursor: 'pointer', marginBottom: '2vh'}}/>
                    <img id="plusIcon" src={minus} onClick={removeIngredient} style={{cursor: 'pointer', marginBottom: '2vh'}}/>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Kalorie (kcal)</th>
                            <th scope="col">Białka (g)</th>
                            <th scope="col">Tłuszcze (g)</th>
                            <th scope="col">Węglowodany (g)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{summaryTableValues.totalCalories}</td>
                            <td>{summaryTableValues.totalProteins}</td>
                            <td>{summaryTableValues.totalFats}</td>
                            <td>{summaryTableValues.totalCarbohydrates}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div id="btnSbmt">
                        <label type="button" className="btn btn-outline-dark" style={{fontWeight: 'bold', width: '25%'}} onClick={createMeal}>Utwórz </label>
                    </div>
                    <span style={{fontWeight:"bold"}}>{createdMeal}</span>
                </form>
            </article>
        </div>
    )
}

export default CreateMeal;
