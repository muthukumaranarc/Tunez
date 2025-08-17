import Content from './Content';
import Head from './Head';
import Menu from './Menu';
import { useEffect, useState } from 'react';
import './Land.css';
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
        if(window.innerWidth <= 768) {
            setMenuState(false);
        }
    },[]);

    // 🔙 Force browser back button → Home
    useEffect(() => {
        const handlePopState = () => {
            setPage("Home"); 
            if(window.innerWidth <= 768) setMenuState(false); else setMenuState(true);
            setCollView(null); 
            setSearchStatus(false);
            setLogbut(false);

            // Prevent leaving the site by pushing a dummy state again
            window.history.pushState(null, "", window.location.href);
        };

        // Push initial state so back button triggers popstate
        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    // Fetch logged-in user
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
    }, [baseURL]);

    // Fetch profile pic
    useEffect(() => {
        fetch(`${baseURL}/user/profile-pic`, {
          credentials: 'include' 
        })
          .then(res => res.text()) 
          .then(url => setPicUrl(url.trim().replace(/^"|"$/g, '')))
          .catch(err => console.error(err));
      }, [baseURL]);

    return (
        <>
        {
            (logbut) ? <Login setLogbut={setLogbut}/> : <>
            <Head 
                menuState={menuState} 
                setMenuState={setMenuState} 
                setLogbut={setLogbut} 
                user={user} 
                picUrl={picUrl}
                setSearchStatus={setSearchStatus}
                searchStatus={searchStatus}
                setSearchData={setSearchData}
                page={page}
                setPage={setPage}
            />
            <div style={{height:"49px"}}></div>
            {
                (menuState) ? 
                  <Menu 
                    setMenuState={setMenuState} 
                    page={page} 
                    setPage={setPage} 
                    setCollView={setCollView} 
                    setGet={setGet}  
                    setSearchStatus={setSearchStatus}
                  /> 
                : <div></div> 
            }
            <div style={{display:'flex'}}>
                <div style={{width: (menuState && window.innerWidth >= 768) ? '260px' : '0px'}}></div> 
                <Content 
                    menuState={menuState} 
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
    );
}

export default Land;
