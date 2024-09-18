import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginForm from "../auth-user/LoginForm";
import SignupForm from "../auth-user/SignupForm";
import UserProfile from "../auth-user/UserProfile";
import UserEditForm from "../auth-user/UserEditForm";
import ItinSearch from "../itineraries/ItinSearch";
import ItinForm from "../itineraries/ItinForm";
import TagList from "../tags/TagList";
import TagDetails from "../tags/TagDetails";
import Home from "../home/Home";

/** Wanderlyst Routes
 * 
 */

function RouteList({login, signup}){

    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />}/>
            <Route path="/users/profile/:username" element={<UserProfile />}/>
            <Route path="/users/profile/edit" element={<UserEditForm />}/>
            <Route path="/explore" element={<ItinSearch />}/>
            <Route path="/tags" element={<TagList />}/>
            <Route path="/itineraries/new" element={<ItinForm />}/>
            <Route path="/itineraries/:id" element={<Home />}/>
            <Route path="/tags/:name" element={<TagDetails />}/>
            <Route path ="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default RouteList;