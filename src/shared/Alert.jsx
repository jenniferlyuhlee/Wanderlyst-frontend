import React from "react";

/** Alert component to display users form submission results
 * Loops through messages and displays them
 * Props: type("danger", "success"), messages []
 */

function Alert({type, messages=[]}){
    return(
        <div className={`alert alert-${type} my-2`} role="alert">
            {messages.map((err, i) => (
                <p className = "small m-0" key={i}>{err}</p>
            ))}
        </div>
    )
}

export default Alert;