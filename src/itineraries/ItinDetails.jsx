import React, { useState, useEffect, useContext, useRef, forwardRef} from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import WanderlystApi from "../utils/api";
import UserContext from "../auth-user/UserContext";
import GoogleMap from "./GoogleMap";
import Loading from "../shared/Loading";
import Alert from "../shared/Alert";
import "./ItinDetails.css"
import { APIProvider} from "@vis.gl/react-google-maps";


function ItinDetails(){
    const { currUser, likes, toggleLike, hasLikedItin } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
 
    // state set to null to use loading spinner
    const [itinerary, setItinerary] = useState(null);
    // error state for invalid param - itinerary id 
    const [error, setError] = useState(false);
    // error message state 
    const [errorMsg, setErrorMsg] = useState(null);
    // status to set liked status - convert id param to integer
    const [liked, setLiked] = useState(hasLikedItin(+id));


    // fetches itinerary details from API upon initial load
    useEffect(function getItinDetails() {
        async function getItin(){
            try{
                setItinerary(await WanderlystApi.getItin(id));
            }
            catch(err){
                console.error("Itinerary not found");
                setError(true);
            }
        }
        getItin();
    }, [id, likes]);

    // function to delete itinerary
    async function deleteItin(){
        try{
           const resp = await WanderlystApi.deleteItin(id, currUser.username);
           if (resp.deleted === +id) navigate('/');
        }
        catch(err){
            setErrorMsg([err]);
        }
    }

    // function to handle likes
    async function handleLike(){
        toggleLike(+id);
        setLiked(likeState => !likeState);
    }

    if(error) return <p className="NotFound"><i>Sorry this itinerary doesn't exist.</i></p>
    if(!itinerary) return <Loading />

    return(
        <div className = "Itin-details card body-cont">
                {errorMsg?
                    <Alert type = "danger" messages = {errorMsg}/>
                    :
                    null
                }
            <div className = "Itin-info mb-2">
                <div className="Itin-info-head">
                <h1>{itinerary.title}</h1>
                    <h3 className="">{itinerary.city}, {itinerary.country}</h3>
                    <h5>{itinerary.duration} days</h5>
                    <div className="Itin-tags">
                    {itinerary.tags?
                        itinerary.tags.map(t => (
                            <NavLink key={t} to ={`/tags/${t}`}>
                                <span className = "badge text-bg-primary">
                                    {t}
                                </span>
                            </NavLink>

                        ))
                        :
                        null
                    }
                    </div>
                    <p>By: <NavLink to={`/users/profile/${itinerary.username}`}>
                            @{itinerary.username}
                        </NavLink>
                    </p>
                    <p>Posted: {itinerary.createdAt.slice(0, 10)}</p>
                </div>
                <div className="Itin-info-likes">
                    {itinerary.username === currUser.username?
                        <>
                        <div className="text-start">
                            <i className="bi bi-trash3-fill" onClick={deleteItin}/>
                        </div>
                        <div className="Itin-likes">
                            <i className ="bi bi-heart likes-display" />
                            <p className="ms-1">{itinerary.likes}</p>
                        </div>
                        </>
                        :
                        <div className="Itin-likes">
                            {liked ?
                                <i className ="bi bi-heart-fill" onClick = {handleLike}/>
                                :
                                <i className="bi bi-heart" onClick = {handleLike}/>
                            }
                            <p className="ms-1">{itinerary.likes}</p>
                        </div>
                    }

                </div>
               
            </div>
            <hr/>
            <p className="mt-2 mb-3">{itinerary.description}</p>
 
            <div className = "Itin-map mb-4">
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
                    <GoogleMap itinerary={itinerary}/>
                </APIProvider>
            </div>

            <div className="Itin-Places">
                    {itinerary.places.map(p => (
                        <div key = {p.seq} className="Place">
                        <p>
                            <b>{p.seq}. {p.name}</b>
                            <br/>
                            <i>{p.address}</i>
                            <br/>
                        </p>
                        <p className="mx-3">{p.description}</p>
                        
                        {!(p.image ==="" || p.image=== null)? 
                            <img src={p.image} alt={p.name} className="Place-img"/> 
                            : 
                            null
                        }
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default forwardRef(ItinDetails);