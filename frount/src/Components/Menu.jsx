import './Menu.css';
import home from '../assets/home.png';
import expo from '../assets/Explore.png';
import coll from '../assets/Collection.png';
import set from '../assets/gear.png';

function Menu({page, setPage , setCollView, setGet,  setSearchStatus}) {

    return (
        <div className='menuBar'>
            <button onClick={() => {setPage("Home"); setCollView(null); setSearchStatus(false)}}>
                <div className='show' style={{backgroundColor:`${page == "Home" ? "rgba(36, 4, 122, 1)" : "white"}`}}></div>
                <img src={home} />
                <h2>Home</h2>
            </button>
            <button onClick={() => {setPage("Explorer"); setCollView(null); setSearchStatus(false)}}>
                <div className='show' style={{backgroundColor:`${page == "Explorer" ? "rgba(36, 4, 122, 1)" : "white"}`}}></div>
                <img src={expo} />
                <h2>Explorer</h2>  
            </button>
            <button onClick={() => {setPage("Collection"); setCollView(null); setSearchStatus(false)}}>
                <div className='show' style={{backgroundColor:`${page == "Collection" ? "rgba(36, 4, 122, 1)" : "white"}`}}></div>
                <img src={coll} />
                <h2>Collection</h2>
            </button>
            <button onClick={() => {setPage("Setings"); setCollView(null); setSearchStatus(false)}}>
                <div className='show' style={{backgroundColor:`${page == "Setings" ? "rgba(36, 4, 122, 1)" : "white"}`}}></div>
                <img src={set} />
                <h2>Setings</h2>
            </button>
            <div className='NewCollDev'>
                <button onClick={() => {setGet(true); setPage("Collection"); setSearchStatus(false)}}><p>+ New Collection</p></button>
            </div>
        </div>
    )
}

export default Menu;