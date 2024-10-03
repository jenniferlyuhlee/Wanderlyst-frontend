import React from "react";
import { Link } from "react-router-dom";
import "./TagCard.css"

/** TagCard Component
 * props: tag: {name, description}
 */
function TagCard({tag}){
    return(
        <Link to={`/tags/${tag.name}`} className = "TagCard">
            <div className = {`Tag-bg tag-bg-${tag.name}`}>
                <div className = "TagCard-overlay">
                    <h4>{tag.name}</h4>
                </div>
            </div>
        </Link>
    )
}

export default TagCard;