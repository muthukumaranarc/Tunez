import '../../styles/Collection.css';
import API_BASE_URL from '../../api/apiConfig';

function Collection({collection, setCollView}) {
    const baseURL = API_BASE_URL;

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
        <button className='collection fade-in' onClick={handleClick}> 
            <div 
                className="collection-img"
                style={{
                    backgroundImage: `url(${baseURL}/collection/get/image/${collection.id})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <h2>{collection.name}</h2>
        </button>
    );
}

export default Collection;