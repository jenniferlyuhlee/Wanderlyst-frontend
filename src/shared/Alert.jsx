import React from "react";

/** Alert component to display users form submission results
 * Loops through messages and displays them
 * Props: type("danger", "success"), messages []
 */

function Alert({type, messages=[]}){
    return(
        <div>
            <ul>
                {messages.map(err => (
                    <li key={err}>{err}</li>
                ))}
            </ul>
        </div>
    )
}

export default Alert;