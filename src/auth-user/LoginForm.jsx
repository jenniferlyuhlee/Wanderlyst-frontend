import React, { useState, useContext} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "./UserContext";
import Alert from "../shared/Alert";

/** Login Form component
 * Props: login
 * - When submitted, calls login function prop
 * - Redirects user to user homepage
 */

function LoginForm({login}){
    const initialState = {
        username: "",
        password: ""
    };
    // hooks called unconditionally
    const { currUser } = useContext(UserContext);
    const navigate = useNavigate();
  
    // conditional rendering - redirects logged in users to homepage
       if(currUser){
        return <Navigate to="/" />
    }

    // states: formData, formErrors
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(null);

    // general callback to update targeted form data
    function handleChange(e){
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value}))
    }

    // form submission handler
    async function handleSubmit(e){
        e.preventDefault();
        let result = await login(formData);
        if(result.success){
            navigate("/");
        }
        else{
            setFormErrors(result.err)
        
        }
    }

    return(
        <div className = "Home">
        <div className="container card px-5 auth-form">
            <h1 className = "text-center mb-3">Login</h1>
            <p className = "my-2">Share & stay updated on unforgettable experiences.</p>
            <form onSubmit = {handleSubmit} className = "row">
                <div className = "form-floating mb-3 p-0">
                    <input id = "username"
                        className = "form-control"
                        name = "username"
                        placeholder = "username"
                        value = {formData.username}
                        onChange = {handleChange}
                        required
                    />
                    <label htmlFor = "username">Username</label>
                </div>
                <div className = "form-floating mb-3 p-0">
                    <input id = "password"
                        className = "form-control"
                        name = "password"
                        type = "password"
                        placeholder=""
                        value = {formData.password}
                        onChange = {handleChange}
                        required
                    />
                    <label htmlFor = "password">Password</label>
                </div>
                {formErrors ?
                    <Alert type = "danger" messages = {formErrors}/>
                    :
                    null
                }
                <button className = "btn rounded-pill btn-lg btn-primary">
                    Login
                </button>
            </form>
        </div>
        </div>
    )
}

export default LoginForm;