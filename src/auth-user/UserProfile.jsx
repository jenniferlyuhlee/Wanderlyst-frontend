import React, { useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import WanderlystApi from "../utils/api";
import ItinCard from "../itineraries/ItinCard";
import dateConvert from "../helpers/dateConvert";
import "./UserProfile.css"

/** User Profile Page Component
 * Displays user details and associated itineraries (created/likes)
 */

function UserProfile(){
    const { username } = useParams();
    // state set to null to use loading spinner
    const [user, setUser] = useState(null);
    // error state for invalid param user username
    const [error, setError] = useState(false);

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
    }, [username]);

    if(error) return <p>Sorry, this user could not be found.</p>

    if(!user) return <h1>Loading...</h1>

    return(
        <div className = "container">
            <div className = "Profile-header">
                <img className = "Profile-img" src = 
                {user.profilePic ? `${user.profilePic}`
                    : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106"
                }
                />
                <div className = "Profile-info">
                    <h1>@{user.username}</h1>
                    <h4>{user.firstName} {user.lastName}</h4>
                    {user.location ? <p>{user.location}</p> : ""}
                    {user.bio ? <p>{user.bio}</p> : ""}
                    <small>Joined {dateConvert(user.createdAt)}</small>
                    <Link to={``}
                        className = "btn btn-sm rounded-pill btn-primary">
                        Edit Profile
                    </Link>
                </div>
            </div>
            <hr/>
            <div>
                <div className = "Profile-itins-menu">
                    <i className="itin-menu bi bi-journal-richtext"></i>
                    <i className="itin-menu bi bi-bookmark-heart"></i>
                </div>
                <h2>Itineraries</h2>
                {user.itineraries.length > 0 ?
                    <div>
                        {user.itineraries.map(i => (
                            <ItinCard key = {i.id} itinerary={i}/>
                        ))}
                    </div>
                :
                <p>Start sharing itineraries!</p>
                }
            </div>
            <div>
                <h2>Likes</h2>
                <i className="bi bi-bookmark-heart-fill"></i>
                {user.likes.length > 0 ?
                    <div>
                        {user.likes.map(i => (
                            <ItinCard key = {i.id} itinerary={i}/>
                        ))}
                    </div>
                :
                <p>Start exploring and liking itineraries!</p>
                }
            </div>
        </div>
    )
}

export default UserProfile;