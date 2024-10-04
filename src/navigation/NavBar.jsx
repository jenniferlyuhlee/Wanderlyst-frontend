import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth-user/UserContext";
import "./NavBar.css"

/** NavBar component
 * Displays content based on currUser
 * currUser ? profile/itineraries/tags : signup/login display
 */
function NavBar(){
    const { currUser, logout} = useContext(UserContext);

    return(
        <nav className = "NavBar">
            <div className = "NavBar-left">
                <NavLink className = "NavBar-link-left wanderlyst" to = "/">
                    WanderLyst
                </NavLink>
                {currUser ? 
                <> 
                    <NavLink className = "NavBar-link-right" to = "/explore">
                        Explore
                    </NavLink>
                    <NavLink className = "NavBar-link-right" to = "/tags">
                        Tags
                    </NavLink>
                    <NavLink className = "NavBar-link-right" to = "/itineraries/new">
                        Share
                    </NavLink>
                </>
                :
                ""
                }
            </div>
            <div className = "NavBar-right">
                {currUser? 
                <>
                    <div className="dropdown NavBar-link-right">
                        <img className = "NavBar-profilePic dropdown-toggle"
                            href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                            src = {currUser.profilePic ? `${currUser.profilePic}`
                            : "/default_profile.jpg"}
                        />
                        <ul className="dropdown-menu text-center p-2">
                            <li>
                                <NavLink className = "NavBar-link-right" 
                                    to={`users/profile/${currUser.username}`}>
                                    Profile
                                </NavLink>
                            </li>
                            <hr className = "my-1"/>
                            <li>
                            <Link className="NavBar-link-right" 
                                to="/" 
                                onClick={logout}>Logout
                            </Link>  
                            </li>
                        </ul>
                    </div>  
                </>
                :
                <>
                    <NavLink className = "NavBar-link-right" to = "/signup">
                        Signup
                    </NavLink>
                    <NavLink className = "NavBar-link-right" to = "/login">
                        Login
                    </NavLink>
                </>
                }
            </div>
        </nav>
    )
}

export default NavBar;