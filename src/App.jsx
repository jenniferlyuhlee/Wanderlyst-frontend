import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// API import
import WanderlystApi from './utils/api'
// Hooks imports
import useLocalStorageState from './hooks/useLocalStorageState'
// Component imports
import RouteList from './navigation/RouteList';
import NavBar from './navigation/NavBar';

function App() {
  // centralized states: token
  const [count, setCount] = useState(0)
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorageState('wanderlyst-token');

  // Handles signup, sets token and logins new user
  async function signup(data){
    try{
      let token = WanderlystApi.signup(data);
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


  return (
    <>
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
    </>
  )
}

export default App
