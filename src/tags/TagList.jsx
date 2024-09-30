import React, { useState, useEffect, useContext} from "react";
import WanderlystApi from "../utils/api";
import UserContext from "../auth-user/UserContext";
import TagCard from "./TagCard";
import Loading from "../shared/Loading";
import "./TagList.css"

function TagList(){
    const { tags } = useContext(UserContext);

    if(!tags){
        return <Loading />
    }

    return(
        <div className = "TagList">
            <div className="TagList-text">
                <p className = "fs-4 mb-4">Explore itineraries by tags</p>
                <p>On Wanderlyst, we categorize itineraries by 10 different tags—each corresponding 
                to a travel style and identity. Click on each tag to learn more.</p>
            </div>
            <div className = "TagList-grid">
                {tags.map(t => <TagCard key={t.id} tag = {t}/>)}
            </div>
        </div>

    )
}

export default TagList;