import React, { useState, useEffect} from "react";
import WanderlystApi from "../utils/api";
import TagCard from "./TagCard";
import "./TagList.css"

function TagList(){
    // state set to null to use loading spinner
    const [tags, setTags] = useState(null);

    // fetches tags from API upon initial load
    useEffect(function getTags() {
        async function getAllTags(){
            setTags(await WanderlystApi.getAllTags());
        }
        getAllTags();
    }, []);

    if(!tags){
        return(<h1>Loading...</h1>)
    }

    return(
        <div className = "TagList">
            <div className="TagList-text">
                <p className = "fs-4 mb-4">Explore itineraries by tags</p>
                <p>On Wanderlyst, we categorize itineraries by 10 different tags—each corresponding 
                to a travel style and identity. Click on each tag to learn more.</p>
            </div>
            <div className = "TagList-grid">
                {tags.map(t => <TagCard key={t} tag = {t}/>)}
            </div>
        </div>

    )
}

export default TagList;