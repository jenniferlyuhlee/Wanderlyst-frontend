import React, { useState } from "react";
import UserContext from "../auth-user/UserContext";
import WanderlystApi from "../utils/api";
import '@testing-library/jest-dom';

const demoUser = {
  username: "testadmin", 
  firstName: "testfirst",
  lastName: "testlast",
  location: "testloc",
  bio: "testbio",
  profilePic: null,
  isAdmin: true,
};

const demoTags = [
  {id: 1, name: 'Foodie', description: 'Savor the world one bite at a time. Dive into a journey packed with delicious local cuisines, hidden culinary gems, and must-try dishes that will leave your taste buds tingling.'},
  {id: 2, name: 'Explorer', description: 'Step off the beaten path and uncover the unknown. From ancient ruins to vibrant cityscapes, let your curiosity guide you through unforgettable experiences.'}
]

const UserProvider = ({ children, 
                        currUser = demoUser, 
                        setCurrUser, 
                        tags = demoTags,
                        logout,
                        hasLikedItin,
                        toggleLike }) => {
  const [user, setUser] = useState(currUser);

  return (
    <UserContext.Provider value={{ currUser: user, 
                                  setCurrUser: setUser, 
                                  tags, logout, 
                                  hasLikedItin, toggleLike}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };