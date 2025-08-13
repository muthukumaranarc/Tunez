import './CollectionsViewer.css';
import Song from './Song';

function CollectionsViewer({ view, setSong, setPlay, setPlayAll, setSongs, needImage}) {
    let name = "";
    let songs = [];
    let image = "";

    if(typeof view[0] === "string") {
        name = view[0];
        for(let i = 1;i< view.length ; i++){
            songs[i-1] = view[i];
        }
        image = `http://localhost:7000/song/get/image/${songs[0].id}`;
    } 
    else if(typeof view[0].artist != 'undefined'){
        name = view[0].artist;
        image = `http://localhost:7000/artist/get/image/${view[0].id}`;
        for(let i = 1;i< view.length ; i++){
            songs[i-1] = view[i];
        }
    }
    else if(typeof view[0].collectionName != 'undefined'){
        name = view[0].collectionName;
        for(let i = 1;i< view.length ; i++){
            songs[i-1] = view[i];
        }
        image = `http://localhost:7000/song/get/image/${songs[0].id}`;
    }
    else {
        name = view[0].name;
        image = `http://localhost:7000/collection/get/image/${view[0].id}`;
        for(let i = 1;i< view.length ; i++){
            songs[i-1] = view[i];
        }
    }

    const handle = () => {
        setPlay(false);
        setPlayAll(true);
        setSongs(songs);
        setTimeout(() => {
            setPlay(true);
        }, 100);
    }

    return (
        <>
        <button className='PlayAll' onClick={handle}>Play All</button>
        <div className='collectionHead'>
            <div className='collImg' style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
                }}>
            </div>
            <h2>{name}</h2>
        </div>

        <div className='collSongs'>
        {
            songs?.map((item, ind) => (
                <Song 
                    key={ind} 
                    data={item} 
                    songs={songs}
                    setSong={setSong} 
                    setPlay={setPlay} 
                    setPlayAll={setPlayAll}
                    setSongs={setSongs}
                    needImage={needImage}
                />
            ))
        }
        </div>

        </>
    )
}

export default CollectionsViewer;