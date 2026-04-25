import Home from "./pages/MainLayout";
import './styles/App.css';
import { useEffect, useState } from 'react';
import Loader from "./components/layout/Loader";


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
    showSlowNetworkAlert();

    return () => {
      window.removeEventListener("offline", showOfflineAlert);
      window.removeEventListener("online", showSlowNetworkAlert);
    };
  }, []);

  let [load, setLoad] = useState(true);

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
        <Home setLoad={setLoad} />
      </>
    );
}

export default App;