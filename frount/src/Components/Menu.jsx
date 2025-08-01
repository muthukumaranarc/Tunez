import './Menu.css';
import home from '../assets/home.png';
import expo from '../assets/Explore.png';
import coll from '../assets/Collection.png';
import set from '../assets/gear.png';

function Menu() {
    return (
        <div className='menuBar'>
            <button>
                <img src={home} />
                <h2>Home</h2>
            </button>
            <button>
                <img src={expo} />
                <h2>Explorer</h2>  
            </button>
            <button>
                <img src={coll} />
                <h2>Collection</h2>
            </button>
            <button>
                <img src={set} />
                <h2>Setings</h2>
            </button>
        </div>
    )
}

export default Menu;