import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth-user/UserContext";

function NavBar(){
    return(
        <div>
            <div>
                <NavLink to="/">Wanderlyst</NavLink>
            </div>
            <div>
                <NavLink to="/signup">Signup</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>
        </div>
    )
}

export default NavBar;