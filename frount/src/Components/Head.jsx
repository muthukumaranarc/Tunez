import './Head.css';
import menu from '../assets/Menu.png'
import logo from '../assets/Only_Logo_NoBackground.png'
import search from '../assets/search.png';

function Head() {

    return (
        <div className='head'>
        <button><img src={menu} /></button>
        <img src={logo} />
        <h2>Tunez</h2>
        <div className='search'>
            <a><img src={search} /></a>
            <input
                type="text"
                name="username"
                className="name"
                placeholder="Search songs, collections, artists"
            />
        </div>
        <div className='userSec'>
            <button>Login</button>
        </div>
        </div>
    )
}

export default Head;