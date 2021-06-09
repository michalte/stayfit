import React from 'react';


const ProductsList = (props) => {


    return (
        <React.Fragment>
            {props.products.map((product, index) =>
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{product.name}</td>
                    <td>{product.calories}</td>
                    <td>{product.weight}</td>
                    <td>{product.proteins}</td>
                    <td>{product.fats}</td>
                    <td>{product.carbohydrates}</td>
                    <td>{product.group}</td>
                </tr>)}
        </React.Fragment>
    )
}

export default ProductsList;

