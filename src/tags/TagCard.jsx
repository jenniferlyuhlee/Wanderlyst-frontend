import React from "react";
import { Link } from "react-router-dom";
import "./TagCard.css"

function TagCard({tag}){
    return(
        <Link to={`/tags/${tag}`} className = "TagCard ">
            <div className = {`Tag-bg tag-bg-${tag}`}>
                <div className = "TagCard-overlay">
                    <h4>{tag}</h4>
                </div>
            </div>
        </Link>
    )
}

export default TagCard;