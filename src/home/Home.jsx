import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

function Home(){
    return(
        <div className = "Home">
            <div className = "Home-title">
                <h1 className = "display-1">
                    Wanderlyst
                </h1>
                <p className = "fs-5">
                    Your go-to guide for planning and sharing itineraries that inspire.
                    Connect with journeys that fuel your desire to wander every corner of the world.
                </p>
                <Link to = "/signup" 
                    className = "rounded-pill btn btn-lg btn-primary">
                    Join now
                </Link>
            </div>
        </div>
    )
}

export default Home;