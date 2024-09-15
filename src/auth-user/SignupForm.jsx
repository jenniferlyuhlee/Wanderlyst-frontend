import React, { useState, useContext} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import AlertCard from "../shared/Alert";

/** Signup Form component
 * Props: signup
 * - When submitted, calls signup function prop
 * - Redirects user to user homepage
 */

function SignupForm(){
    const initialState = {
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: ""
    }
    // hooks
    const navigate = useNavigate();

    // states: formData, formErrors
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);

    // general callback to update targeted form data
    function handleChange(e){
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value}))
    }

    // form submission handler
    async function handleSubmit(e){
        e.preventDefault();
        alert(`signup successful: ${formData.username}`)
        // let result = await signup(formData);
        // if(result.sucess){
        //     navigate("/")
        // }
        // else{
        //     setFormErrors(result.err);
        // }
    }

  
    return(
        <div className = "Home">
            <div className = "container card px-5 auth-form"
                style = {{width: '32rem'}}>
                <h1 className = "text-center mb-4">Signup</h1>
                <p>Join now to share & uncover unforgettable experiences.</p>
                <form onSubmit = {handleSubmit} className = "row">
                    <div className = "form-floating mb-3 p-0">
                        <input id = "firstName"
                            className = "form-control"
                            name = "firstName"
                            placeholder = "firstName"
                            value = {formData.firstName}
                            onChange = {handleChange}
                        />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className = "form-floating mb-3 p-0">
                        <input id = "lastName"
                            className = "form-control"
                            name = "lastName"
                            placeholder = "lastName"
                            value = {formData.lastName}
                            onChange = {handleChange}
                        />
                        <label htmlFor = "lastName">Last Name</label>
                    </div>
                    <div className = "form-floating mb-3 p-0">
                        <input
                            className = "form-control"
                            name = "email"
                            placeholder = "email"
                            value = {formData.email}
                            onChange = {handleChange}
                        />
                        <label htmlFor = "email">Email</label>
                    </div>
                    <div className = "form-floating mb-3 p-0">
                        <input
                            className = "form-control"
                            name = "username"
                            placeholder = "username"
                            value = {formData.username}
                            onChange = {handleChange}
                        />
                        <label htmlFor = "username">Username</label>
                    </div>
                    <div className = "form-floating mb-3 p-0">
                        <input
                            className = "form-control"
                            name = "password"
                            type = "password"
                            placeholder = "password"
                            value = {formData.password}
                            onChange = {handleChange}
                        />
                        <label htmlFor = "password">Password</label>
                    </div>
                    <button className = "btn rounded-pill btn-lg btn-primary">
                        Signup
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignupForm;