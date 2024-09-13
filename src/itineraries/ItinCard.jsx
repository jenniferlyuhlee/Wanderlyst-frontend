import React from "react";
import { Link } from "react-router-dom";

function ItinCard({itinerary}){
    return(
        <Link to={`/itineraries/${itinerary.id}`}>
            <div>
                <h4>{itinerary.title}</h4>
                <p>{itinerary.city}, {itinerary.country}</p>
                <p>Duration: {itinerary.duration} days</p>
                <small>By: {itinerary.username}</small>
            </div>
        </Link>
    )
}

export default ItinCard;