import arrow from '../assets/arrow.png';
import { useContext } from "react";
import { GlobalContext } from './GlobalContext';
import './Next.css';


function Next() {
    let { status, setstatus } = useContext(GlobalContext);

    function handle() {
        setstatus(false); 
        console.log(status)
    }

    return(
        <button  onClick={() => {handle()}} className='next'>  
            <h2>Get Start</h2>
            <img src= {arrow}/>
        </button>
    )
}

export default Next;