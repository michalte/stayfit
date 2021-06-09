import React, {useEffect} from 'react';
import Navbar from "./Navbar";
import FilterBar from "./FilterBar";
import axios from "axios";
import {useState} from "react";
import ProductsList from "./ProductsList";

const Products = (props) => {
    axios.defaults.withCredentials = true;
    const [categoriesList, setCategoriesList] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [productsList, setProductsList] = useState([]);
    const [productsBackupList, setProductsBackupList] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");


    useEffect(() => {
        let one = "http://localhost:8080/productCategories"
        let two = "http://localhost:8080/products"

        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0].data
            const responseTwo = responses[1].data
            setCategoriesList(responseOne);
            setProductsList(responseTwo);
        })).catch(errors => {
        })
        props.setIdSelectedMeal("");
    }, [])

    useEffect(() => {
        search();
    }, [filterValue, categoryFilter])


    useEffect(() => {
        console.log("ZAKTUALIZOWANO BACKUP:");
        console.log(productsBackupList);
        console.log(productsList.length);
        console.log(productsBackupList.length);
        let products2 = productsBackupList.slice().filter(a => a.name.toUpperCase().includes(filterValue.toUpperCase()));
        products2 = products2.slice().filter(b => b.group.includes(categoryFilter));
        setProductsList(products2);

    }, [productsBackupList])

    function search() {
            if(productsList.length >= productsBackupList.length){
                setProductsBackupList(productsList);
            }
            else
        {
            console.log("SEARCH")
            const backup = productsBackupList.slice();
            setProductsBackupList(backup);
        }

    }

    useEffect(() => {
        console.log(productsList)
    },[productsList])

    return (
        <div>
            <Navbar setLoggedUser={props.setLoggedUser} setLoggedIn={props.setLoggedIn}/>
            <FilterBar setFilterValue={setFilterValue} setCategoryFilter={setCategoryFilter} categories={categoriesList}/>
            <article style={{display: 'flex', flexDirection: 'column', height: '70%'}} id="noBackgroundNav">
                <h2 style={{textAlign: 'center', paddingTop: '2%'}}>Lista produktów</h2>
                <div className="tab invisible-scrollbar" style={{position: 'relative', height: '470px', paddingBottom:'2px'}}>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col" style={{borderRadius: '10px 0 0 10px'}}>#</th>
                            <th scope="col"><span>Nazwa</span></th>
                            <th scope="col">Kaloryczność (kcal)</th>
                            <th scope="col">Waga (g)</th>
                            <th scope="col">Białka (g)</th>
                            <th scope="col">Tłuszcze (g)</th>
                            <th scope="col">Węglowodany (g)</th>
                            <th scope="col" style={{borderRadius: '0 10px 10px 0'}}>Kategoria</th>
                        </tr>
                        </thead>
                        <tbody>
                        <ProductsList filterValue={filterValue} products={productsList}
                                      setProductsList={setProductsList} categoryFilter={categoryFilter}/>
                        </tbody>
                    </table>
                </div>
            </article>
        </div>
    )
}

export default Products;
