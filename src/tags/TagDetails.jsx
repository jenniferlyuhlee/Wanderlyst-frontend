import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import WanderlystApi from "../utils/api";
import ItinCard from "../itineraries/ItinCard";

/** Tag Details Page Component
 * Displays tag details and associated itineraries
 */

function TagDetails(){
    const { name } = useParams();
    // state set to null to use loading spinner
    const [tag, setTag] = useState(null);
    // error state for invalid param tag name
    const [error, setError] = useState(false);

    useEffect(function getTagDetails() {
        async function getTag(){
            try{
                setTag(await WanderlystApi.getTag(name));
            }
            catch(err){
                console.error("Tag not found");
                setError(true);
            }
        }
        getTag();
    }, [name]);

    if(error) return <p>Sorry this tag doesn't exist.</p>

    if(!tag) return <h1>Loading...</h1>

    return(
        <div>
            <h1>{tag.name}</h1>
            <p>{tag.description}</p>
            {tag.itineraries.length > 0 ?
            <div>
                {tag.itineraries.map(i => (
                    <ItinCard key = {i.id} itinerary={i}/>
                ))}
            </div>
            :
            <p>Sorry, no itineraries have been tagged yet.</p>
            }
        </div>
    )
}

export default TagDetails;