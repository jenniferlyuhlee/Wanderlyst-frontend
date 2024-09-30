import React, { useContext } from "react";
import UserContext from "../auth-user/UserContext";

function TagsSelect( {selectedTags, handleTagChange} ){
    const { tags } = useContext(UserContext);

    return(
        <div className = "Form-tag-check row mt-2">
            <h5 className = "mb-1 p-0">Tags:</h5>
            {tags.map(tag => (
            <div key={tag.id} className="form-check">
                <input className="form-check-input col" 
                    type="checkbox" 
                    value={tag.id} 
                    id={tag.name}
                    onChange = {handleTagChange}
                    checked = {selectedTags.includes(String(tag.id))}
                />
                <label className="form-check-label" htmlFor={tag.name}>
                    {tag.name}
                </label>
            </div>
            ))}
        </div>
    );
}

export default TagsSelect;