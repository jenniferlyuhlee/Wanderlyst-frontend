import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth-user/UserContext";
import pickRandom from "../helpers/random";
import "./Home.css"

/** Home page component
 *  Displays different content based on currUser
 *  Includes functionality to navigate to random tag detail page
 */

function Home(){
    const { currUser, tags } = useContext(UserContext);

    return(
        <div className = "Home">
            <div className = "Home-title">
                {currUser ?
                <>
                    <div className = "Home-header">
                        <h1 className = "display-1 wanderlyst fw-medium">
                            Welcome {currUser.firstName}!
                        </h1>
                        <img className = "Home-gif" 
                            src = "https://www.futurewings.co.za/wp-content/uploads/2023/07/giphy.gif" />
                    </div>
                    <p className = "fs-6 mb-2">
                        Your go-to guide for planning and sharing itineraries that inspire.
                        Connect with journeys that fuel your desire to wander every corner of the world.
                    </p>
                    <Link to = "/explore" 
                        className = "rounded-pill btn btn-lg btn-primary me-2">
                        Search itineraries
                    </Link>
                    <p className = "fs-6 mt-4 mb-2">
                        Don't know where to start? Click below to explore a random tag.
                    </p>
                    <Link to = {`/tags/${pickRandom(tags.map(t => t.name))}`}
                        className = "rounded-pill btn btn-lg btn-primary">
                        Explore a tag
                    </Link>
                </>
                :
                <>
                    <h1 className = "display-1 wanderlyst fw-medium">
                        WanderLyst
                    </h1>
                    <p className = "fs-6 mb-2">
                        Your go-to guide for planning and sharing itineraries that inspire.
                        Connect with journeys that fuel your desire to wander every corner of the world.
                    </p>
                    <Link to = "/signup" 
                        className = "rounded-pill btn btn-lg btn-primary">
                        Join now
                    </Link>
                </>
                }
            </div>
        </div>
    )
}

export default Home;