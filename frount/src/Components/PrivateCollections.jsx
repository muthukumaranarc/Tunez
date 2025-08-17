import { useState, useRef, useEffect } from 'react';
import './PrivateCollections.css';

function PrivateCollections({ data, setCollView }) {
    const baseURL = import.meta.env.VITE_API_URL;
    const firstSong = data.songsId[0];
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);

    const handleClick = () => {
        const songs = data.songsId;
        Promise.all(
            songs.map(id =>
                fetch(`${baseURL}/song/get/${id}`)
                    .then(res => res.json())
            )
        )
        .then(songData => {
            setCollView([data, ...songData]);
        })
        .catch(console.error);
    };

    const handleDeleteCollection = () => {
        fetch(`${baseURL}/privateCollection/delete/${data.collectionName}`, {
            method: "DELETE",
            credentials: "include"
        })
        .finally(() => setCollView(false));
        setShowPopup(false);
    };

    // Right click handler
    const handleRightClick = (e) => {
        e.preventDefault(); 
        setShowPopup(true);
    };

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setShowPopup(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="collection-container" style={{ position: 'relative' }}>
            <button 
                className='collBox' 
                onClick={handleClick}
                onContextMenu={handleRightClick}
            >
                <div style={{
                    backgroundImage: `url(${baseURL}/song/get/image/${firstSong})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '120px'
                }}>
                </div>
                <h2>{data.collectionName}</h2>
            </button>

            {showPopup && (
                <div 
                    ref={popupRef} 
                    className="popup-menu" 
                    style={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        boxShadow: '0px 2px 10px rgba(0,0,0,0.2)',
                        padding: '10px',
                        zIndex: 100
                    }}
                >
                    <button 
                        onClick={handleDeleteCollection}
                        style={{
                            background: 'red',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '3px',
                            cursor: 'pointer'
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default PrivateCollections;
