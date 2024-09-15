import React from "react";
import { Link } from "react-router-dom";
import "./ItinCard.css"

function ItinCard({itinerary}){
    return(
        <Link to={`/itineraries/${itinerary.id}`} 
              className = "ItinCard color-card card my-3 p-2">
            <div className="card-body">
                <h4 className = "card-title">
                    {itinerary.title}
                </h4>
                <hr className="m-0"></hr>
                <p className = "card-subtitle m-0">
                    {itinerary.city}, {itinerary.country}
                </p>
                <p className = "m-0">
                    Duration: {itinerary.duration} days
                </p>
                <p>{itinerary.description}</p>
               
            </div>
        </Link>
    )
}

export default ItinCard;