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
    // hooks
    const navigate = useNavigate;

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
        let result = await login(formData);
        if(result.success){
            navigate("/");
        }
        else{
            setFormErrors(result.err)
        }
    }
    
    return(
        <div>
            <h1>Login</h1>
            <form onSubmit = {handleSubmit}>
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
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;