import './Song.css';


function Song({data ,setSong, songs, setPlay, setPlayAll, setSongs}) {

    let name = (data.name.length < 35)? data.name : data.name.slice(0, 35) + "...";
    let artist = (data.artist.length < 35)? data.artist : (data.artist).slice(0, 35) + "...";
    
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
                backgroundImage: `url(http://localhost:7000/song/get/image/${data.id})`,
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