import '../../styles/Head.css';
import menu from '../../assets/Menu.png';
import search from '../../assets/search.png';
import { useEffect, useState } from 'react';

function Head({ page, setPage, menuState, setMenuState, setLogbut, user, picUrl, setSearchStatus, searchStatus, setSearchData }) {
    const [picture, setPicture] = useState("");
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        setPicture(picUrl);
    }, [picUrl]);

    // 🔹 Interval to read input every 0.5 sec while searchStatus is true
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
            <button className='menu' onClick={() => setMenuState(!menuState)}>
                <img src={menu} alt="Toggle Menu" />
            </button>
            
            {/* Logo shown only on mobile when sidebar is closed */}
            {!menuState && (
                <div className="mobile-logo-text">Tunez</div>
            )}
            
            {page && (
                <div className='search-container'>
                    <div className='search-icon-wrapper'>
                        <img src={search} alt="Search" />
                    </div>
                    <input
                        type="text"
                        name="username"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setSearchStatus(true)}
                        autoComplete="off"
                        className="search-input"
                        placeholder="Search songs, artists, playlists..."
                    />
                </div>
            )}

            {(user == null) ? (
                <button className='loginHead' onClick={() => setLogbut(true)}>
                    Log in
                </button>
            ) : (
                <div className='userSec'>
                    <p className="user-name">{user?.name.split('@')[0]}</p>
                    <button 
                        style={{
                            backgroundImage: `url(${picture})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }} 
                        className='userPro' 
                        onClick={() => setPage("Setings")}
                        aria-label="User Profile"
                    />
                </div>
            )}
        </div>
    );
}

export default Head;

