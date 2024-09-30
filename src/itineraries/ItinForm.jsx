import React, { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import WanderlystApi from "../utils/api";
import cleanData from "../helpers/cleanData";
import TagsSelect from "./TagsSelect";
import PlaceForm from "./PlaceForm";
import Alert from "../shared/Alert";
import "./ItinForm.css"

function ItinForm(){
    const initialPlaceState = {
        name: "",
        address: "",
        description: "",
        image: ""
    }
    const initialItinState = {
        title: "",
        city: "",
        country: "",
        duration: "",
        description: "",
        tags: [],
        places: [initialPlaceState]
    }

    // states: formData, formErrors, saveConfirmed
    const [formData, setFormData] = useState(initialItinState);
    const [formErrors, setFormErrors] = useState(null);

    const navigate = useNavigate();

    // general callback to update targeted form data for basic fields
    function handleChange (e) {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value }));
    }

    // Updates tags data 
    function handleTagChange(e){
        const { value, checked } = e.target;
    setFormData(data => {
        if (checked) {
            // Add tag only if it's not already in the array
            return {
                ...data,
                tags: data.tags.includes(value) ? data.tags : [...data.tags, value]
            };
        } else {
            // Remove tag if unchecked
            return {
                ...data,
                tags: data.tags.filter(t => t !== value)
            };
        }
    });
    }

    // Updates place form data based on index of place
    function handlePlaceChange(index, e){
        const { name, value } = e.target;
        const updatedPlaces = [...formData.places];
        updatedPlaces[index] = {...updatedPlaces[index], [name]: value}
        setFormData(data => ({...data, places: updatedPlaces}));
    }

    // handler for adding new place form when button clicked
    function addPlace(){
        setFormData(data => ({
            ...data,
            places: [...data.places, initialPlaceState]
        }));
    }

    // handler for removing new place form when button clicked
    function removePlace(idx){
        setFormData(data => ({
            ...data,
            places: data.places.slice(0, -1)
        }));
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const itineraryData = {
                ...formData,
                // automatically add sequence to data without user specifying
                places: formData.places.map((place, i) => ({
                        ...cleanData(place),
                        seq: i + 1
                    })
                )
            };
            console.log(itineraryData);
    
            const itinerary = await WanderlystApi.createItin(itineraryData);
            navigate(`itineraries/${itinerary.id}`)
        }
        catch(err){
            setFormErrors(err)
            return;
        }
    }

    return(
         <div className = "container mb-5 body-cont">
            <div className = "card px-5">
                <h2 className = "text-center">
                    {formData.title || "My New Itinerary"}
                </h2>
                <form onSubmit = {handleSubmit} className = "row m-1">
                    <div className = "form-floating col-9 mb-2 p-0">
                        <input id = "title"
                            className = "form-control"
                            name = "title"
                            placeholder = "firstName"
                            value = {formData.title}
                            onChange = {handleChange}
                        />
                        <label htmlFor = "title">Title</label>
                    </div>
                    <div className ="col-3 form-floating p-0">
                    <input id = "duration"
                            name = "duration"
                            className = "form-control"
                            type = "number"
                            min = "1"
                            placeholder = "duration"
                            value = { formData.duration }
                            onChange = {handleChange} />
                    <label htmlFor = "duration">Days</label>
                </div>
                    <div className = "form-floating col-6 mb-2 p-0">
                        <input id = "city"
                            className = "form-control"
                            name = "city"
                            placeholder = "city"
                            value = {formData.city}
                            onChange = {handleChange}
                        />
                        <label htmlFor = "city">City</label>
                    </div>
                    <div className = "form-floating col-6 mb-2 p-0">
                        <input id = "country"
                            className = "form-control"
                            name = "country"
                            placeholder = "country"
                            value = {formData.country}
                            onChange = {handleChange}
                        />
                        <label htmlFor = "country">Country</label>
                    </div>
                    <div className = "form-group col-12 mb-2 p-0">
                        <textarea id = "description"
                            className = "form-control"
                            name = "description"
                            rows = "4"
                            placeholder = "Share a description of the overall itinerary! This will display on the itinerary preview card."
                            value = {formData.description}
                            onChange = {handleChange}
                        />
                    </div>

                    {/* TagsSelect Form component */}
                    <TagsSelect selectedTags={formData.tags} handleTagChange={handleTagChange}/>
                    
                    {/* Render PlaceForm for each place added in Itinerary.places */}
                    {formData.places.map((place, i) => (
                        <PlaceForm key={i} 
                                   index={i} 
                                   placeData={place} 
                                   handlePlaceChange={handlePlaceChange}
                        />
                    ))}

                    <div className = "p-0 text-center">
                        <button type="button" className = "btn p-0 mb-2 mx-2 secondary" 
                        onClick={addPlace}>
                            <i className="bi bi-plus-circle-fill"></i>
                        </button>
                    {formData.places.length > 1 ? 
                        <button type="button" className = "btn p-0 mb-2 mx-2 secondary" 
                        onClick={removePlace}>
                            <i className="bi bi-dash-circle-fill"></i>
                        </button>
                        :
                        null
                    }
                    </div>

                    {formErrors?
                        <Alert type = "danger" messages = {formErrors}/>
                        :
                        null
                    }

                    <button className = "btn rounded-pill btn-lg btn-primary">
                        Share
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ItinForm;