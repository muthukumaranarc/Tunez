import Lottie from 'lottie-react';
import loadingAnim from '../assets/loading.json';


function Loader() {
  return (
    <div 
        style={{
            height:"102vh",
            width:"102Vw",
            border:"1px solid red",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            position:"fixed",
            top:"-1vh",
            left:"-1vw",
            zIndex:"10",
            background:"white"
        }}> 
        <div 
            style={{
                height:"350px",
                width: "350px",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}>
            <Lottie animationData={loadingAnim} loop={true} />
            <h2 style={{
                fontSize:"45px",
                position:"relative",
                right:"50px"
            }}>Tunez</h2>
        </div>
    </div>
  );
}

export default Loader;