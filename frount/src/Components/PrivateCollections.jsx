import './PrivateCollections.css';

function PrivateCollections({data, setCollView}) {
    const baseURL = import.meta.env.VITE_API_URL;

    const firstSong = data.songsId[0];

    const handleClick = () => {
        const songs = data.songsId; 
        Promise.all(
            songs.map(id =>
                fetch(`${baseURL}/song/get/${id}`)
                    .then(res => res.json())
            )
        )
        .then(songData => {
            console.log(songData)
            setCollView([data, ...songData]);
        })
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <button className='collBox' onClick={handleClick}>
            <div style={{
                backgroundImage: `url(http://localhost:7000/song/get/image/${firstSong})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
                }}>
            </div>
            <h2>{data.collectionName}</h2>
        </button>
    )
}

export default PrivateCollections;