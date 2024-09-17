import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth-user/UserContext";
import "./Home.css"

function Home(){
    const { currUser } = useContext(UserContext);
    return(
        <div className = "Home">
            <div className = "Home-title">
                {currUser ?
                <>
                    <h1 className = "display-1">
                        Welcome {currUser.firstName}!
                    </h1>
                    <p className = "fs-6">
                        Your go-to guide for planning and sharing itineraries that inspire.
                        Connect with journeys that fuel your desire to wander every corner of the world.
                    </p>
                    <Link to = "/explore" 
                        className = "rounded-pill btn btn-lg btn-primary me-2">
                        Search itineraries
                    </Link>
                    <Link to = "/tags" 
                        className = "rounded-pill btn btn-lg btn-primary">
                        Check out tags
                    </Link>
                </>
                :
                <>
                    <h1 className = "display-1">
                        Wanderlyst
                    </h1>
                    <p className = "fs-6">
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