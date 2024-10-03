import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth-user/UserContext";
import "./ItinCard.css"

/** ItinCard component
 *  Props: itinerary{name, city, country, duration...}
 *  Displays itinerary preview for search, tags, profile pages
 */
function ItinCard({itinerary}){
    const { currUser, toggleLike, hasLikedItin } = useContext(UserContext);
    const [liked, setLiked] = useState(hasLikedItin(itinerary.id));

    async function handleLike(){
        toggleLike(itinerary.id);
        setLiked(likeState => !likeState);
    }

    return(
            <div className="ItinCard color-card card my-3 p-4">
                <Link to={`/itineraries/${itinerary.id}`} 
                className = "ItinCard-link">
                     <h4 className = "card-title">
                        {itinerary.title}
                    </h4>
                </Link>
                <hr className="m-0"></hr>
                <div className = "ItinCard-body mt-1">
                    <div className = "ItinCard-info">
                        <small className = "card-subtitle m-0">
                            {itinerary.city}, {itinerary.country}
                        </small>
                        <br></br>
                        <small>
                            Duration: {itinerary.duration} days
                        </small>
                        <p>
                            <Link to={`/users/profile/${itinerary.username}`}>
                                <b>{itinerary.username} </b>
                            </Link> 
                            {itinerary.description}
                        </p>
                    </div>
                    {itinerary.username === currUser.username?
                    null
                    :
                    <div>
                        {liked? 
                        <i className ="bi bi-heart-fill"  onClick = {handleLike} />
                        :
                        <i className="bi bi-heart" onClick = {handleLike} />
                        }
                    </div>
                    }
                </div>  
            </div>
           
    )
}

export default ItinCard;