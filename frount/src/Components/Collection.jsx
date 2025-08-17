// import { useEffect } from 'react';
import './Collection.css';

function Collection({collection, setCollView}) {
    const baseURL = import.meta.env.VITE_API_URL;

    let red = 15;

    let name = (collection?.name?.length < red)? collection.name : collection.name?.slice(0, red) + "..";

    const handleClick = () => {
    const songs = collection.songsId; 
        Promise.all(
            songs.map(id =>
                fetch(`${baseURL}/song/get/${id}`)
                    .then(res => res.json())
            )
        )
        .then(songData => {
            setCollView([collection.name, ...songData]);
        })
        .catch(error => {
            console.error(error);
        });
    };


    return (
        <button className='collection' onClick={handleClick}> 
            <div style={{
                backgroundImage: `url(${baseURL}/collection/get/image/${collection.id})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'}}>
            </div>
            <h2>{name}</h2>
        </button>
    )
}

export default Collection;