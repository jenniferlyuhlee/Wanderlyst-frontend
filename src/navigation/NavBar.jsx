import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth-user/UserContext";
import "./NavBar.css"

function NavBar(){
    return(
        <nav className = "NavBar">
            <div className = "Navbar-left">
                <NavLink className = "NavBar-link-left" to = "/">
                    Wanderlyst
                </NavLink>
            </div>
            <div className = "Navbar-right">
                <NavLink className = "NavBar-link-right" to = "/explore">
                    Explore
                </NavLink>
                <NavLink className = "NavBar-link-right" to = "/tags">
                    Tags
                </NavLink>
                <NavLink className = "NavBar-link-right" >
                    Profile
                </NavLink>
                <NavLink className = "NavBar-link-right" to = "/signup">
                    Signup
                </NavLink>
                <NavLink className = "NavBar-link-right" to = "/login">
                    Login
                </NavLink>
            </div>
        </nav>
    )
}

export default NavBar;