import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import WanderlystApi from './utils/api'
import useLocalStorageState from './hooks/useLocalStorageState'
import UserContext from './auth-user/UserContext'
import RouteList from './navigation/RouteList';
import NavBar from './navigation/NavBar';
import Loading from './shared/Loading'
import './App.css'

function App() {
  // centralized states: infoLoaded, currUser, token, likes, tagsLoaded, tags
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorageState('wanderlyst-token');
  const [likes, setLikes] = useState(new Set([]));
  // Fetching tags at app level for multiple uses
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const [tags, setTags] = useState(null);

  // load user info from API after login, re-runs when token changes (user logs-in)
  useEffect(function getUserInfo(){
    async function getCurrUser(){
      if(token){
        try{
          let { username } = jwtDecode(token);
          WanderlystApi.token = token;
          let user = await WanderlystApi.getUser(username);
          let currUser = {
            username: user.username, 
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            bio: user.bio,
            profilePic: user.profilePic,
            isAdmin: user.isAdmin,
          }
          setCurrUser(currUser);
          setLikes(new Set(user.likes.map(itin => itin.id)))
        }
        catch(err){
          setCurrUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrUser();
  }, [token])

  // fetches tags from API upon initial load
  useEffect(function getTags() {
    async function getAllTags(){
      if(token){
        const fetchedTags = await WanderlystApi.getAllTags()
        setTags(fetchedTags);
      }
      setTagsLoaded(true);
    }
    setTagsLoaded(false);
    getAllTags();
  }, [token]);

  // Handles signup, sets token and logins new user
  async function signup(data){
    try{
      let token = await WanderlystApi.signup(data);
      setToken(token);
      return {success: true}
    }
    catch(err){
      return {success: false, err}
    }
  }
  // Handles login, set token
  async function login(data){
    try{
      let token = await WanderlystApi.login(data)
      setToken(token)
      return {success: true}
    }
    catch(err){
      return {success: false, err}
    }
  }

  // Handles logout - sets token and currUser to null
  function logout(){
    setCurrUser(null);
    setToken(null);
  }

  // Checks if user has liked an itinerary
  function hasLikedItin(itinId){
    return likes.has(itinId);
  }

  // Likes/unlikes itinerary, adding to state of currUser.likes
  async function toggleLike(itinId){
    // unlike - remove from currUser.likes
    if(hasLikedItin(itinId)){
      await WanderlystApi.likeItin(currUser.username, itinId);
      setLikes(new Set([...likes].filter(id => id !== itinId)));
      return false;
    } 
    else{
      // like - add to currUser.likes
      await WanderlystApi.likeItin(currUser.username, itinId);
      setLikes(new Set([...likes, itinId]));
      return true;
    }
  }

  if (!(infoLoaded && tagsLoaded)) return <Loading />;
  
  return (
    <UserContext.Provider
      value = {{currUser, setCurrUser, logout, hasLikedItin, toggleLike, likes, tags}}>
      <NavBar />
      <div className='Body-content'>
        <RouteList login={login} signup={signup} />
      </div>
      <div className='p-3 text-center text-secondary'>
        <small>© 2024 Wanderlyst. Powered by Google Maps & Places APIs</small>
      </div>
   </UserContext.Provider>
  )
}

export default App;
