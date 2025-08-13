import Home from "./Components/Land";
import './App.css';
import { useEffect, useState } from 'react';
import Loader from "./Components/Loader";


function App() {

  let [load, setLoad] = useState(false);

  setTimeout(() => {
    setLoad(false);
  }, 8000);

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