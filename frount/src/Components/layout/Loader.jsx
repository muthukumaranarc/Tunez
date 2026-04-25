import Lottie from 'lottie-react';
import loadingAnim from '../../assets/loading.json';
import '../../styles/Loader.css';

function Loader() {
  return (
    <div className='loaderMain'> 
        <div className="loader-content">
            <div className="loader-animation">
                <Lottie animationData={loadingAnim} loop={true} />
            </div>
            <h2>Tunez</h2>
        </div>
    </div>
  );
}

export default Loader;