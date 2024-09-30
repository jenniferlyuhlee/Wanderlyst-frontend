import React, { useState } from "react";
import WanderlystApi from "../utils/api";
import cleanData from "../helpers/cleanData";
import ItinCard from "./ItinCard";

function ItinSearch( ){
    const initialState = {
        title: "",
        country: "",
        duration: "",
        tags: []
    }
    const [itineraries, setItineraries] = useState(null);
    const [searchQuery, setSearchQuery] = useState(initialState);

    // general callback to update targeted form data (text inputs)
    function handleInputChange(e){
        const { name, value } = e.target
        setSearchQuery(data => ({...data, [name]: value}));
    }
    // general callback to update targeted form data (select input)
    function handleSelectChange(e){
        const { options } = e.target;
        const tags = Array.from(options)
                                    .filter(option => option.selected)
                                    .map(option => option.value);
        setSearchQuery(data => ({...data, tags}));

    }

    // handler for form submission, sends cleaned search query to API
    // displays corresponding itineraries
    async function handleSubmit(e) {
        e.preventDefault();
        const cleanedQuery = cleanData(searchQuery);
        setItineraries(await WanderlystApi.getAllItins(cleanedQuery))
    }

    return(
        <div className = "container px-5 mb-5 body-cont">
            <h3 className = "text-center pb-3">
                Where will you go next?
            </h3>
            <form onSubmit = {handleSubmit} className = "row">
                <div className = "col-12 form-floating p-0">
                    <input id = "title"
                        name = "title"
                        className = "form-control"
                        placeholder = "title"
                        value = { searchQuery.title }
                        onChange = {handleInputChange} />
                    <label htmlFor = "title">Title</label>
                </div>
                <div className = "col-6 form-floating p-0">
                    <input id = "country"
                        name = "country"
                        className = "form-control"
                        placeholder = "country"
                        value = { searchQuery.country }
                        onChange = {handleInputChange} />
                    <label htmlFor = "country">Country</label>
                </div>
                <div className ="col-6 form-floating p-0">
                    <input id = "duration"
                            name = "duration"
                            className = "form-control"
                            type = "number"
                            min = "1"
                            placeholder = "duration"
                            value = { searchQuery.duration }
                            onChange = {handleInputChange} />
                    <label htmlFor = "duration">Max duration (days)</label>
                </div>
                <div className="col-12 form-floating p-0">
                    <select multiple 
                        size = "3"
                        id="tags"
                        name = "tags"
                        className="form-select" 
                        value={ searchQuery.tags}
                        onChange = {handleSelectChange} 
                        style = {{height: '5rem'}}
                    >
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
                    <label htmlFor="tag">Filter by tags</label>
                </div>
                <button className = "btn rounded-pill btn-lg btn-primary mt-3">
                    Search
                </button>
            </form>
        {itineraries ? 
            <div className = "mt-3">
                <i>Showing {`${itineraries.length}
                ${itineraries.length === 1 ? "result" : "results"}:`}</i>
                {itineraries.map(i => (
                    <ItinCard key={i.id} itinerary = {i}/>
                ))}
            </div>
            :
            null}
        </div>
    )
}

export default ItinSearch;
