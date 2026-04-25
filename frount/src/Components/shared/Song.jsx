import '../../styles/Song.css';
import API_BASE_URL from '../../api/apiConfig';

function Song({data, setSong, songs, setPlay, setPlayAll, setSongs}) {
    const baseURL = API_BASE_URL;

    return (
        <button className='song fade-in' onClick={() => {
            setPlay(false);
            setPlayAll(false);
            setSong(data);
            setSongs(songs);
            setTimeout(() => {
                setPlay(true);
            }, 100);
        }}>
            <div className='img-container'>
                <div 
                    className='img' 
                    style={{
                        backgroundImage: `url(${baseURL}/song/get/image/${data.id})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100%',
                        width: '100%'
                    }} 
                />
            </div>

            <div className='song-info'>
                <p className='songName'>{data.name}</p>
                <p className='songAuthor'>{data.artist}</p>
            </div>
        </button>
    );
}

export default Song;