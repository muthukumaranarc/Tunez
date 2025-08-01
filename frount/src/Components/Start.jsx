import logo from '../assets/Only_Logo_NoBackground.png'
import back from '../assets/background.png';
import man from '../assets/SingingMan.png';
import { useState } from "react";

import { GlobalContext } from "./GlobalContext";

import './Start.css';
import Login from './Login';
import Next from './Next';
function Start() {

    let [status, setstatus] = useState(true);

    return(
        <GlobalContext.Provider value={{ status, setstatus}}>
        <div className='start'>
        <img src={back} className='back'/>
        <div className='wel'>
            <div className='logoDev'><img src={logo} className='logo'/></div>
            <h2>Welcome to Tunez</h2>
            <p>your music companion</p>
        </div>
            {
                (status) ? <Next /> : <Login />
            }
        <img src={man}  className='man'/>
        </div>
        </GlobalContext.Provider>
    )
}

export default Start;


