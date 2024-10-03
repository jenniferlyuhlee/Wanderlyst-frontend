import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import WanderlystApi from "../utils/api";
import cleanData from "../helpers/cleanData";
import UserContext from "./UserContext";
import Alert from "../shared/Alert";

/** User Edit Form component
 * Allow users to edit basic information or delete account
 */

function UserEditForm(){
    const { currUser, setCurrUser, logout} = useContext(UserContext);
    
    // states: formData, formErrors, saveConfirmed
    const [formData, setFormData] = useState({
        username: currUser.username,
        password: "",
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        location: currUser.location || "",
        bio: currUser.bio || "",
        profilePic: currUser.profilePic || ""
    })
    const [formErrors, setFormErrors] = useState(null);
    const [saveConfirmed, setSaveConfirmed] = useState(false);
    const [settingErrors, setSettingErrors] = useState(null);

    // general callback to update targeted form data
    function handleChange (e) {
        const { name, value } = e.target;
        // default formData to empty string if value is undefined from currUser
        setFormData(data => ({...data, [name]: value || ""}));
    }

    // form submission handler
    async function handleSubmit(e){
        e.preventDefault();
        let updatedUser;
        try{
            // removes duplicate confirmation password from data
            delete formData.confirmPassword  
            const cleanedFormData = cleanData(formData);
            updatedUser = await WanderlystApi.updateUser(currUser.username, cleanedFormData);

        }
        catch(err){
            setFormErrors(err)
            return;
        }
        // resets profile form to display updated info
        setFormErrors(null);
        setSaveConfirmed(true);
        setCurrUser({
            username: updatedUser.username, 
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            location: updatedUser.location,
            bio: updatedUser.bio,
            profilePic: updatedUser.profilePic,
            isAdmin: updatedUser.isAdmin, 
            likes: currUser.likes});
    }
    

       // delete user handler
    async function handleDelete(){
        try{
            alert(`Deleted account!`)
            const deleted = await WanderlystApi.deleteUser(currUser.username)
            if (deleted){
                logout();
            }
        }
        catch(err){
            setSettingErrors(err);
        }
    }

    return (
        <div className = "container">
            <NavLink to ={`/users/profile/${currUser.username}`}
            className = "btn rounded-pill btn-secondary mt-4 mb-3">
                Return
            </NavLink>
        <div className = "card px-5 mb-5">
            <h2>Edit User Info</h2>
            <form onSubmit = {handleSubmit} className = "row m-1">
                <div className = "form-floating col-6 mb-2 p-0">
                    <input id = "firstName"
                        className = "form-control"
                        name = "firstName"
                        placeholder = "firstName"
                        value = {formData.firstName}
                        onChange = {handleChange}
                    />
                    <label htmlFor = "firstName">First Name</label>
                </div>
                <div className = "form-floating col-6 mb-2 p-0">
                    <input id = "lastName"
                        className = "form-control"
                        name = "lastName"
                        placeholder = "lastName"
                        value = {formData.lastName}
                        onChange = {handleChange}
                    />
                    <label htmlFor = "lastName">Last Name</label>
                </div>
                <div className = "form-floating col-12 mb-2 p-0">
                    <input id = "location"
                        className = "form-control"
                        name = "location"
                        placeholder = "location"
                        value = {formData.location}
                        onChange = {handleChange}
                    />
                    <label htmlFor = "location">Location</label>
                </div>
                <div className = "form-floating col-12 mb-2 p-0">
                    <input id = "bio"
                        className = "form-control"
                        name = "bio"
                        placeholder = "bio"
                        value = {formData.bio}
                        onChange = {handleChange}
                    />
                    <label htmlFor = "bio">Bio</label>
                </div>
                <div className = "form-floating col-12 mb-2 p-0">
                    <input id = "profilePic"
                        className = "form-control"
                        name = "profilePic"
                        placeholder = "profilePic"
                        value = {formData.profilePic}
                        onChange = {handleChange}
                    />
                    <label htmlFor = "profilePic">Profile Pic URL</label>
                </div>
                <div className = "form-floating col-6 mb-2 p-0">
                    <input id = "username"
                        className = "form-control"
                        name = "username"
                        placeholder = "username"
                        value = {formData.username}
                        onChange = {handleChange}
                        disabled
                    />
                    <label htmlFor = "username">Username</label>
                </div>
                <div className = "form-floating col-6 mb-2 p-0">
                    <input id = "password"
                        className = "form-control"
                        name = "password"
                        type = "password"
                        placeholder = "password"
                        value = {formData.password}
                        onChange = {handleChange}
                    />
                    <label htmlFor = "password">New Password</label>
                </div>
                {formErrors?
                    <Alert type = "danger" messages = {formErrors}/>
                    :
                    null
                }
                <button className = "btn rounded-pill btn-lg btn-primary">
                    Save
                </button>
                {saveConfirmed?
                    <Alert type="success" messages={["Updated successfully."]} />
                    :
                    null
                }
            </form>
            <hr  className = "my-3"/>
            <div>
                <h3>Settings</h3>
                <button onClick={handleDelete} className="btn rounded-pill btn-lg btn-danger">
                    Delete Account
                </button>
                {settingErrors? 
                    <Alert type="warning" messages={["Unable to proceed with your request. Try again later."]} />
                    :
                    null
                }
            </div>
        

        </div>
        </div>
    )
}
export default UserEditForm;