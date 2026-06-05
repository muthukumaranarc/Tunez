import '../../styles/Menu.css';
import home from '../../assets/home.png';
import expo from '../../assets/Explore.png';
import coll from '../../assets/Collection.png';
import set from '../../assets/gear.png';

function Menu({setMenuState, page, setPage , setCollView, setGet,  setSearchStatus}) {

    const navItems = [
        { id: "Home", name: "Discover", icon: home },
        { id: "Explorer", name: "Search", icon: expo },
        { id: "Collection", name: "Library", icon: coll },
        { id: "Setings", name: "Settings", icon: set },
    ];

    const handleNav = (id) => {
        setPage(id);
        setCollView(null);
        setSearchStatus(false);
        if(window.innerWidth <= 768) setMenuState(false);
    }

    const Sidebar = () => (
        <div className='menuBar'>
            <div className="sidebar-logo">
                <span className="logo-text text-gradient">Melodix</span>
            </div>
            <div className="sidebar-menu-list">
                {navItems.map((item) => (
                    <button 
                        key={item.id} 
                        onClick={() => handleNav(item.id)}
                        data-active={page === item.id}
                        className="menu-item-btn"
                    >
                        <div className='active-indicator' />
                        <img src={item.icon} alt={item.name} className="menu-icon" />
                        <h2>{item.name}</h2>
                    </button>
                ))}
            </div>
            <div className='NewCollDev'>
                <button onClick={() => {setGet(true); setPage("Collection"); setSearchStatus(false); if(window.innerWidth <= 768) setMenuState(false)}}>
                    <p>+ New Collection</p>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {window.innerWidth <= 768 ? (
                <div className='backMenu' onClick={() => setMenuState(false)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <Sidebar />
                    </div>
                </div>
            ) : (
                <Sidebar />
            )}
        </>
    )
}

export default Menu;