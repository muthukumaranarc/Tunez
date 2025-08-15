import Home from "./Components/Land";
import './App.css';
import { useEffect, useState } from 'react';
import Loader from "./Components/Loader";


function App() {

  useEffect(() => {
    const showOfflineAlert = () => {
      alert("🚫 No Internet Connection");
    };

    const showSlowNetworkAlert = () => {
      if (navigator.connection && navigator.connection.downlink < 0.4) {
        alert("⚠️ Slow Internet Connection");
      }
    };

    window.addEventListener("offline", showOfflineAlert);
    window.addEventListener("online", showSlowNetworkAlert);

    // Optional: Check speed at start
    showSlowNetworkAlert();

    return () => {
      window.removeEventListener("offline", showOfflineAlert);
      window.removeEventListener("online", showSlowNetworkAlert);
    };
  }, []);

  let [load, setLoad] = useState(true);

  setTimeout(() => {
    setLoad(false);
  }, 2000);

     useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

    return (
      <>
        {
          load ?  <Loader /> : <></>
        }
        <Home />
      </>
    );
}

export default App;