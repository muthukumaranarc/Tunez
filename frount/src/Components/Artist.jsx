import './Artist.css'

function Artist({setCollView, artist}) {
    const baseURL = import.meta.env.VITE_API_URL;
    let name = (artist.artist.length < 14)? artist.artist : artist.artist.slice(0, 14) + "..";

    const handleClick = () => {
        const songs = artist.songsId; 
        Promise.all(
    songs.map(id =>
        fetch(`${baseURL}/song/get/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Song ${id} not found`);
                }
                return res.text(); // read as text first
            })
            .then(text => text ? JSON.parse(text) : {}) // safe parse
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
        <button className='artist' onClick={handleClick}>
            <div style={{
                backgroundImage: `url(${baseURL}/artist/get/image/${artist.id})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'}}>
            </div>
            <h2>{name}</h2>
        </button>
    )
}

export default Artist;