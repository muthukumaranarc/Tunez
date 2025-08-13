import './Menu.css';
import home from '../assets/home.png';
import expo from '../assets/Explore.png';
import coll from '../assets/Collection.png';
import set from '../assets/gear.png';

function Menu({setPage , setCollView}) {

    return (
        <div className='menuBar'>
            <button onClick={() => {setPage("Home"); setCollView(null);}}>
                <img src={home} />
                <h2>Home</h2>
            </button>
            <button onClick={() => {setPage("Explorer"); setCollView(null);}}>
                <img src={expo} />
                <h2>Explorer</h2>  
            </button>
            <button onClick={() => {setPage("Collection"); setCollView(null);}}>
                <img src={coll} />
                <h2>Collection</h2>
            </button>
            <button onClick={() => {setPage("Setings"); setCollView(null);}}>
                <img src={set} />
                <h2>Setings</h2>
            </button>
            <div className='NewCollDev'>
                <button><p>+ New Collection</p></button>
            </div>
        </div>
    )
}

export default Menu;