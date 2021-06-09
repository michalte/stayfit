import React from 'react';

const FilterBar = (props) => {

    function search(e) {
        props.setFilterValue(e.target.value)
    }

    function searchByCategory(e){
        props.setCategoryFilter(e.target.value)
    }

    return (
        <React.Fragment>
            <input id="inputForNameFiltering" type="text" placeholder="Wyszukaj po nazwie" className="form-control" style={{width: "50%", display: "inline-block", marginTop: "10px"}} onChange={search}/>
            <select name="groups" className="form-control" style={{display: "inline-block", width: "22%", float:"right", marginTop: "10px"}} id="groups" onChange={searchByCategory}>
                <option
                    value="" selected="selected">Brak</option>
                {props.categories.map(category => <option
                value={category}>{category}</option>)}
            </select>
        </React.Fragment>
    )
}
export default FilterBar;
