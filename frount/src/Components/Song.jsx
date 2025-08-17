import './Song.css';


function Song({data ,setSong, songs, setPlay, setPlayAll, setSongs}) {

    const baseURL = import.meta.env.VITE_API_URL;

    let dec = 35;

    if(window.innerWidth < 768) dec = 30

    let name = (data.name.length < 35)? data.name : data.name.slice(0, 35) + "...";
    let artist = (data.artist.length < dec)? data.artist : (data.artist).slice(0,  dec) + "...";
    
    return (
        <>
        <button className='song' onClick={() => {
            setPlay(false);
            setPlayAll(false);
            setSong(data);
            setSongs(songs);
            setTimeout(() => {
                setPlay(true);
            }, 100);
        }}>
            <div style={{
                backgroundImage: `url(${baseURL}/song/get/image/${data.id})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'}}>
            </div>

            <p className='songName'>{name}</p>
            <p className='songAuthor'>{artist}</p>
        </button>
        </>
    )
}


export default Song;