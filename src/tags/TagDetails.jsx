import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WanderlystApi from "../utils/api";
import ItinCard from "../itineraries/ItinCard";
import Loading from "../shared/Loading";
import "./TagDetails.css"

/** Tag Details Page Component
 * Displays tag details and associated itineraries
 * Params: name
 */

function TagDetails(){
    const { name } = useParams();
    // state set to null to use loading spinner
    const [tag, setTag] = useState(null);
    // error state for invalid param tag name
    const [error, setError] = useState(false);

    // fetches tag details from API upon initial load
    useEffect(function getTagDetails() {
        async function getTag(){
            try{
                setTag(await WanderlystApi.getTag(name));
            }
            catch(err){
                setError(true);
            }
        }
        getTag();
    }, [name]);

    if(error) return <p className="NotFound"><i>Sorry this tag doesn't exist.</i></p>

    if(!tag) return <Loading />

    return(
        <div className = "TagDetails">
            <div className = {`TagName-bg TagName-bg-${tag.name}`}>
                <h1 className = "text-center display-4 wanderlyst fw-medium TagName">
                    {tag.name}
                </h1>
            </div>
            <div className="container">
                <p className="m-4">{tag.description}</p>
                {tag.itineraries.length > 0 ?
                <div>
                    {tag.itineraries.map(i => (
                        <ItinCard key = {i.id} itinerary={i}/>
                    ))}
                </div>
                :
                <p className="text-center fst-italic">
                    <i>Sorry, no itineraries have been tagged yet.</i>
                </p>
                }
            </div>
        </div>
    )
}

export default TagDetails;