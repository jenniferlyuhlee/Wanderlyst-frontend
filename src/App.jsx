import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import WanderlystApi from './utils/api'
import useLocalStorageState from './hooks/useLocalStorageState'
import UserContext from './auth-user/UserContext'
import RouteList from './navigation/RouteList';
import NavBar from './navigation/NavBar';
import './App.css'

function App() {
  // centralized states: user infoLoaded, currUser, token, likes
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorageState('wanderlyst-token');

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
            isAdmin: user.isAdmin
          }
          setCurrUser(currUser);
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

  if (!infoLoaded) return <h1>..loading</h1>
  
  return (
    <UserContext.Provider
      value = {{currUser, setCurrUser, logout}}>
      <NavBar />
      <div className='Body-content'>
        <RouteList login={login} signup={signup}/>
      </div>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
   </UserContext.Provider>
  )
}

export default App
