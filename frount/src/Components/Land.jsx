import Content from './Content';
import Head from './Head';
import Menu from './Menu';
import { useEffect } from 'react';

import './Land.css';

import { useState } from 'react';
import Login from './Login';

function Land() {
    const baseURL = import.meta.env.VITE_API_URL;

    const [get, setGet] = useState(false);
    let [logbut, setLogbut] = useState(false);
    let [menuState , setMenuState ] = useState(true);
    let [page, setPage] = useState("Home");
    const [collView, setCollView] = useState(null);
    const [user, setUser] = useState(null);
    const [picUrl, setPicUrl] = useState(null);
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchData, setSearchData] = useState("");

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
        .catch(() => {})
    }, [baseURL])

    useEffect(() => {
        fetch(`${baseURL}/user/profile-pic`, {
          credentials: 'include' // Important so cookies/session tokens are sent
        })
          .then(res => res.text()) // since backend returns plain string
          .then(url => setPicUrl(url.trim().replace(/^"|"$/g, '')))
    
          .catch(err => console.error(err));
      }, [baseURL]);
    return (
        <>
        {
            (logbut) ? <Login setLogbut={setLogbut}/> : <>
            <Head 
                menuState = {menuState} 
                setMenuState = {setMenuState} 
                setLogbut={setLogbut} 
                user={user} 
                picUrl={picUrl}
                setSearchStatus={setSearchStatus}
                searchStatus={searchStatus}
                setSearchData={setSearchData}
                page={page}
            />
            <div style={{height:"49px"}}></div>
            {
                (menuState) ? <Menu page={page} setPage={setPage} setCollView={setCollView} setGet={setGet}  setSearchStatus={setSearchStatus}/> : <div></div> 
            }
            <div style={{display:'flex'}}>
                <div style={{width: menuState ? '260px' : '0px'}}></div> 
                <Content 
                    menuState = {menuState} 
                    page={page} 
                    collView={collView}
                    setCollView={setCollView} 
                    user={user} 
                    picUrl={picUrl}
                    setLogbut={setLogbut}
                    get={get}
                    setGet={setGet}
                    searchStatus={searchStatus}
                    searchData={searchData}
                    setSearchStatus={setSearchStatus}
                />
            </div>
            </>
        }
        
        </>
    )
}

export default Land;