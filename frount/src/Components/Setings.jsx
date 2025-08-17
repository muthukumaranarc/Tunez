// import { useState } from 'react'; 
import './setings.css'; 
import userim from '../assets/user.png'

function Setings({ user, picUrl, setLogbut }) {
  const baseURL = import.meta.env.VITE_API_URL;

  const handleLogOut = async () => {
    try {
      const res = await fetch(`${baseURL}/user/delete/cookie`, {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        window.location.reload();
      } else {
        console.error("Failed to delete cookie");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await fetch(`${baseURL}/user/delete`, {
        method: "DELETE",
        credentials: "include"
      });
      await handleLogOut();
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  return (
    <div className="seting">
      <div className="userSlid">
        {picUrl ? (
          <img
            src={user != null ? picUrl : userim}
            alt="Con't load Profile"
            className='profile'
          />
        ) : (
          <div className='noProfile' ></div>
        )}
        <p>{user != null ? user?.name : "No user"}</p>
        <button onClick={() => setLogbut(true)}>Switch account</button>
      </div>

      {user != null && (
        <>
          <button className="deleteUser" onClick={handleDeleteUser}>Delete user</button>
          <button className="logOut" onClick={handleLogOut}>Log out</button>
        </>
      )}

      <a
        className="viewDev"
        href="https://muthukumaran-portfolio.web.app"
        target="_blank"
        rel="noreferrer"
      >
        View developer
      </a>
    </div>
  );
}

export default Setings;
