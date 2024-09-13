import React, { useState, useContext} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import Alert from "../shared/Alert";

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
        <div>
            <h1>Signup</h1>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input
                        name = "firstName"
                        value = {formData.firstName}
                        onChange = {handleChange}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        name = "lastName"
                        value = {formData.lastName}
                        onChange = {handleChange}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        name = "email"
                        value = {formData.email}
                        onChange = {handleChange}
                    />
                </div>
                <div>
                    <label>Username</label>
                    <input
                        name = "username"
                        value = {formData.username}
                        onChange = {handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        name = "password"
                        type = "password"
                        value = {formData.password}
                        onChange = {handleChange}
                    />
                </div>
                <button>Signup</button>
            </form>
        </div>
    )
}

export default SignupForm;