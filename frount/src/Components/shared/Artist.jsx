import '../../styles/Artist.css'
import API_BASE_URL from '../../api/apiConfig';

function Artist({setCollView, artist}) {
    const baseURL = API_BASE_URL;

    const handleClick = () => {
        const songs = artist.songsId; 
        Promise.all(
            songs.map(id =>
                fetch(`${baseURL}/song/get/${id}`)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`Song ${id} not found`);
                        }
                        return res.text();
                    })
                    .then(text => text ? JSON.parse(text) : {})
            )
        )
        .then(songData => {
            setCollView([artist, ...songData]);
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <button className='artist fade-in' onClick={handleClick}>
            <div 
                className="artist-img"
                style={{
                    backgroundImage: `url(${baseURL}/artist/get/image/${artist.id})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <h2>{artist.artist}</h2>
        </button>
    );
}

export default Artist;