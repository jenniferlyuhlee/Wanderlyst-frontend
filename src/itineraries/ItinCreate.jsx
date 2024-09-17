import React, { useState, useContext} from "react";
import WanderlystApi from "../utils/api";
import UserContext from "../auth-user/UserContext";

function ItinCreate(){
    const { currUser } = useContext(UserContext);

    // states: formData, formErrors, saveConfirmed
    const [formData, setFormData] = useState({
            title: "",
            city: "",
            country: "",
            duration: "",
            description: "",
            tags: [],
            places: []
    })
    const [formErrors, setFormErrors] = useState(null);

    // general callback to update targeted form data
    function handleChange (e) {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value }));
    }

    async function handleSubmit(e){
        e.preventDefault();
        alert(`created`)
    }

    return(
         <div className = "container">
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

export default ItinCreate;