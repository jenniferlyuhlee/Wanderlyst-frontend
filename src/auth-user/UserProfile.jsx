import React, { useState, useEffect, useContext} from "react";
import { NavLink, useParams } from "react-router-dom";
import WanderlystApi from "../utils/api";
import UserContext from "./UserContext";
import dateConvert from "../helpers/dateConvert";
import ItinCard from "../itineraries/ItinCard";
import Loading from "../shared/Loading";
import "./UserProfile.css"

/** User Profile Page Component
 * Displays user details and associated itineraries (created/likes)
 */

function UserProfile(){
    const { currUser, likes} = useContext(UserContext);
    const { username } = useParams();

    // state set to null to use loading spinner
    const [user, setUser] = useState(null);
    // error state for invalid param user username
    const [error, setError] = useState(false);
    // toggle display of itineraries/likes
    const [showItins, setShowItins] = useState(true);

    useEffect(function getUserDetails() {
        async function getUser(){
            try{
                setUser(await WanderlystApi.getUser(username));
            }
            catch(err){
                console.error("User not found");
                setError(true);
            }
        }
        getUser();
    }, [username, likes]);

    // toggle itineraries / likes
    function toggleDisplay(){
        setShowItins(state => !state)
    }

    if(error) return <p className="NotFound"><i>Sorry, this user could not be found.</i></p>

    if(!user) return <Loading />

    return(
        <div className = "container pt-2 mb-5 body-cont">
            <h1 className = "Profile-title">@{user.username}</h1>
            <div className = "Profile-header">
                <div className = "Profile-header-group">
                    <img className = "Profile-img" src = 
                    {user.profilePic ? `${user.profilePic}`
                        : "/src/assets/default_profile.jpg"
                    }
                    />
                    <div className = "Profile-info">
                        <h4 className = "Profile-name">{user.firstName} {user.lastName}</h4>
                        {user.location ? 
                            <p>
                                <i className="bi bi-geo-alt-fill"></i> {user.location}
                            </p> 
                        : null}
                        {user.bio ? <p>{user.bio}</p> : null}
                        <small className = "mt-2"><i>Joined {dateConvert(user.createdAt)}</i></small>
                        {currUser.username === user.username ? 
                        <NavLink to={`/users/profile/edit`}
                            className = "mt-3 btn btn-sm rounded-pill btn-secondary">
                            Edit Profile
                        </NavLink>
                        : null}
                    </div>
                </div>
                {currUser.username === user.username ? 
                    <NavLink to="/itineraries/new" className="Profile-add-itin">
                        <i className="bi bi-plus-circle-fill"></i>
                    </NavLink>
                : null}
            </div>
            <hr className = "Profile-separator"/>
            <div>
                <div className = "Profile-itins-menu">
                    <button onClick={toggleDisplay}
                    className = {`itin-menu ${showItins? "active-tab" : ""}`}>
                        <i className = {`bi bi-map${showItins? "-fill" : ""}`}></i>
                    </button>
                    <button onClick={toggleDisplay}
                    className = {`itin-menu ${showItins? "" : "active-tab"}`}>
                        <i className = {`bi bi-bookmark-heart${showItins? "" : "-fill"}`}></i>
                    </button>
                </div>
                {showItins ?
                <div className = "User-itins m-4">
                    <div className = "mt-2">
                    {user.itineraries.length > 0 ?
                         user.itineraries.map(i => (
                            <ItinCard key = {i.id} itinerary={i}/>
                        ))
                    :
                        <div className = "text-center">
                            <i>
                                {currUser.username === user.username? "Start sharing itineraries!" : `${user.username} has no itineraries yet.`}
                            </i>
                        </div>
                    }
                    </div>
                </div>
                :
                <div className = "userLikes m-4">                
                    <div className = "mt-2">
                    {user.likes.length > 0 ?
                        user.likes.map(i => (
                            <ItinCard key = {i.id} itinerary={i}/>
                        ))
                    :
                    <div className = "text-center">
                        <i>
                            {currUser.username === user.username? "Start exploring and liking itineraries!" : `${user.username} has no likes yet.`}
                        </i>
                    </div>
                    }
                    </div> 
                </div>
                }
            </div>
        </div>
    )
}

export default UserProfile;