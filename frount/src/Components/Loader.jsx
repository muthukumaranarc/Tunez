import Lottie from 'lottie-react';
import loadingAnim from '../assets/loading.json';
import './Loader.css';


function Loader() {
  return (
    <div className='loaderMain'> 
        <div>
            <Lottie animationData={loadingAnim} loop={true} />
            <h2>Tunez</h2>
        </div>
    </div>
  );
}

export default Loader;