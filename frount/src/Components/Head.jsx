import './Head.css';
import menu from '../assets/Menu.png'
import userim from '../assets/user.png' 
import logo from '../assets/Only_Logo_NoBackground.png'
import search from '../assets/search.png';
import { useEffect, useState } from 'react';

function Head({menuState, setMenuState, setLogbut}) {
    const baseURL = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState(null);
    const [picUrl, setPicUrl] = useState(null);

    useEffect(() => {
        fetch('http://localhost:7000/user/profile-pic', {
          credentials: 'include' // Important so cookies/session tokens are sent
        })
          .then(res => res.text()) // since backend returns plain string
          .then(url => setPicUrl(url.trim().replace(/^"|"$/g, '')))
    
          .catch(err => console.error(err));
      }, []);

    useEffect(() => {
        fetch(`${baseURL}/user/get/user` , {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({name: data.username})
        })
    }, [baseURL])
    
    return ( 
        <div className='head'>
        <button><img src={menu} onClick={() => {setMenuState(!menuState)}}/></button>
        <img src={logo} />
        <h2>Tunez</h2>
        <div className='search'>
            <a><img src={search} /></a>
            <input
                type="text"
                name="username"
                className="name"
                placeholder="Search songs, collections, artists"
            />
        </div>
        <div className='userSec'>
            <p >{user?.name.split('@')[0]}</p>
            <button onClick={() => {setLogbut(true)}} style={{
                backgroundImage : `url(${(picUrl == null) ? userim : picUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height:"20px",
                width:"20px",
                padding: "15px",
                borderRadius: "50%"
            }}>
            </button>
        </div>
        
        
        </div>
    )
}

export default Head;