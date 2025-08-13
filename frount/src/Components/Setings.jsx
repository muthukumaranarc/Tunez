import './setings.css';
import React, { useEffect, useState } from 'react';

function Setings() {

  const [picUrl, setPicUrl] = useState('');

  useEffect(() => {
    fetch('http://localhost:7000/user/profile-pic', {
      credentials: 'include' 
    })
      .then(res => res.text()) 
      .then(url => setPicUrl(url.trim().replace(/^"|"$/g, '')))

      .catch(err => console.error(err));
  }, []);

  console.log("Profile picture URL:", picUrl);


    return (
        <>
        <div>
      {picUrl ? (
        <img 
          src={picUrl} 
          alt="Profile" 
          style={{ width: '80px', height: '80px', borderRadius: '50%' }} 
        />
      ) : (
        <p>Loading profile picture...</p>
      )}
      <div style={{
        backgroundImage: `url(${picUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:"100px",
        width:"100"
      }}>

      </div>
    </div>
        </>
    )
}

export default Setings;