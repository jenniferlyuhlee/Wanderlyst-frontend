import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth-user/UserContext";
import "./NavBar.css"

function NavBar(){
    const { currUser, logout} = useContext(UserContext);

    return(
        <nav className = "NavBar">
            <div className = "Navbar-left">
                <NavLink className = "NavBar-link-left" to = "/">
                    Wanderlyst
                </NavLink>
                {currUser ? 
                <> 
                    <NavLink className = "NavBar-link-right" to = "/explore">
                        Explore
                    </NavLink>
                    <NavLink className = "NavBar-link-right" to = "/tags">
                        Tags
                    </NavLink>
                    <NavLink className = "NavBar-link-right" to = "/share">
                        Share
                    </NavLink>
                </>
                :
                ""
                }
            </div>
            <div className = "Navbar-right">
                {currUser? 
                <>
                    <NavLink className = "NavBar-link-right" to={`users/profile/${currUser.username}`} >
                        Profile
                    </NavLink>
                    <Link className="NavBar-link-right" 
                        to="/" 
                        onClick={logout}>Logout
                    </Link>  
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