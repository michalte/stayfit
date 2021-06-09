import React, {useEffect} from 'react';
import Select from 'react-select';
import {useState} from "react";

const AddIngredientComponent = (props) => {



    const [selectedIngredient, setSelectedIngredient] = useState();
    const [options, setOptions] = useState();
    const [selectedWeight, setSelectedWeight] = useState();

    function handleIngredientPick(selected){
        setSelectedIngredient(selected);
    }

    function handleWeightInput(selected){
        setSelectedWeight(selected.target.value);
    }


    function updateSummaryTable(){
        let tempTable = props.summaryTableValues;
        props.setSummaryTableValues({
            totalCalories: tempTable.totalCalories,
            totalProteins: tempTable.totalProteins,
            totalFats: tempTable.totalFats,
            totalCarbohydrates: tempTable.totalCarbohydrates})

    }

    useEffect(() => {
        if(selectedIngredient !== undefined) {
            let tempTable = props.ingredients.slice();
            tempTable[props.index] = selectedIngredient;
            props.setIngredients(tempTable);
        }
    }, [selectedIngredient])

   useEffect(() =>{
    }, [])

    useEffect( () => {
        setOptions(props.options);
    }, [props.options])

    useEffect(() =>{
        if(selectedWeight !== undefined) {
            console.log(selectedWeight)
            let tempTable = props.weights.slice();
            tempTable[props.index] = selectedWeight;
            console.log("SELECTED WEIGHTS FLAG");
            console.log(props.weights);
            props.setWeights(tempTable);
        }
    }, [selectedWeight])

    return (
        <div className="flexBoxWrapperCreateMeal">
            <Select value={selectedIngredient} options={options} onChange={handleIngredientPick} placeholder="Wybierz produkt z listy"/>
            <input onBlur={handleWeightInput} type="number" style={{flexBasis: "30%", marginLeft: "5%"}} className="form-control"
                   placeholder="Waga (g)"
                   step="10"/>
        </div>
    )
}

export default AddIngredientComponent;