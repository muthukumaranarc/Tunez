import './Head.css';
import menu from '../assets/Menu.png';
import logo from '../assets/Only_Logo_NoBackground.png';
import search from '../assets/search.png';
import { useEffect, useState } from 'react';

function Head({ page, menuState, setMenuState, setLogbut, user, picUrl, setSearchStatus, searchStatus, setSearchData }) {
    const [picture, setPicture] = useState("");
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        setPicture(picUrl);
    }, [picUrl]);

    // 🔹 Interval to read input every 1 sec while searchStatus is true
    useEffect(() => {
        let interval;
        if (searchStatus) {
            interval = setInterval(() => {
                setSearchData(searchValue);
            }, 500);
        }
        return () => clearInterval(interval); // cleanup on stop
    }, [searchStatus, searchValue, setSearchData]);

    return (
        <div className='head'>
            <button className='menu'>
                <img src={menu} onClick={() => { setMenuState(!menuState) }} />
            </button>
            <img src={logo} />
            <h2>Tunez</h2>
            {
                page ? 
            <div className='search'>
                <a><img src={search} /></a>
                <input
                    type="text"
                    name="username"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => { setSearchStatus(true); }}
                    // onBlur={() => { setSearchStatus(false); }}
                    autoComplete="off"
                    className="name"
                    placeholder="Search songs, collections, artists"
                />
            </div> : <></>
            }
            {
                (user == null) ?
                    <button className='loginHead' onClick={() => { setLogbut(true) }}>
                        Log in
                    </button>
                    :
                    <div className='userSec'>
                        <p>{user?.name.split('@')[0]}</p>
                        <button style={{
                            backgroundImage: `url(${picture})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: "20px",
                            width: "20px",
                            padding: "15px",
                            borderRadius: "50%"
                        }}>
                        </button>
                    </div>
            }
        </div>
    );
}

export default Head;
