import React, { useState } from "react";
import WanderlystApi from "../utils/api";

function ItinSearch( {searchFor, placeholder} ){
    const initialState = {
        title: "",
        country: "",
        duration: "",
        tag: ""
    }
    const [itineraries, setItineraries] = useState(null);
    const [searchQuery, setSearchQuery] = useState(initialState);

    // general callback to update targeted form data
    function handleChange(e){
        const { name, value } = e.target;
        setSearchQuery(data => ({...data, [name]: value}))
    }

    // search form submission that filters & re-renders itineraries list
    async function searchItineraries(filters){
        setItineraries(await WanderlystApi.getAllItins(filters))
    }

    // if (!itineraries) return <h1>loading</h1>

    // form submission handler calls filtering 

    return(
        <div className = "card">
        <form className = "row">
            <div className = "col-12 form-floating p-0">
                <input id = "title"
                    name = "title"
                    className = "form-control"
                    placeholder = "title"
                    value = { searchQuery.title }
                    onChange = {handleChange} />
                <label htmlFor = "title">Title</label>
            </div>
            <div className = "col-12 form-floating p-0">
                <input id = "country"
                    name = "country"
                    className = "form-control"
                    placeholder = "country"
                    value = { searchQuery.country }
                    onChange = {handleChange} />
                <label htmlFor = "country">Country</label>
            </div>
            <div className="col-6 form-floating mb-2 p-0">
                <select id="tag"
                    className="form-select" 
                    placeholder="tag" 
                    value={ searchQuery.tag }
                    onChange = {handleChange} >
                    <option value="">Filter by tag</option>
                    <option value="Foodie">Foodie</option>
                    <option value="Explorer">Explorer</option>
                    <option value="Shopaholic">Shopaholic</option>
                    <option value="Naturalist">Naturalist</option>
                    <option value="Daredevil">Daredevil</option>
                    <option value="Flâneur">Flâneur</option>
                    <option value="Reveller">Reveller</option>
                    <option value="Aesthete">Aesthete</option>
                    <option value="Relaxationist">Relaxationist</option>
                    <option value="Photographer">Photographer</option>
                </select>
                <label htmlFor="tag">Tag</label>
            </div>
            <div className ="col-6 form-floating mb-2 p-0">
                <input id = "duration"
                        name = "duration"
                        className = "form-control"
                        type = "number"
                        min = "1"
                        placeholder = "duration"
                        value = { searchQuery.duration }
                        onChange = {handleChange} />
                <label htmlFor = "duration">Minimum duration</label>
            </div>
            <button className = "btn rounded-pill btn-lg btn-primary">
                Search
            </button>
        </form>
        </div>
    )
}

export default ItinSearch;
