import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

/**
 * Loading spinner component
 * - displays when fetching data from API
 * - controlled by state of parent components
 */
function Loading(){
    return(
        <div className="text-center display-1 m-5">
             <FontAwesomeIcon icon={faSpinner} spin />
        </div>
    )
}

export default Loading;