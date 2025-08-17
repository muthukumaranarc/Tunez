import { useEffect } from 'react';
import './CollectionsViewer.css';
import Song from './Song';
import arrow from '../assets/arrow.png';

function CollectionsViewer({setCollView,  view, setSong, setPlay, setPlayAll, setSongs, needImage, setSearchStatus}) {

    const baseURL = import.meta.env.VITE_API_URL;
    useEffect(() => {
        setSearchStatus(false);
    },[setSearchStatus])

    let name = "";
    let songs = [];
    let image = "";

    if(typeof view[0] === "string") {
        name = view[0];
        for(let i = 1;i< view.length ; i++){
            songs[i-1] = view[i];
        }
        image = `${baseURL}/song/get/image/${songs[0]?.id}`;
    } 
    else if(typeof view[0].artist != 'undefined'){
        name = view[0].artist;
        image = `${baseURL}/artist/get/image/${view[0]?.id}`;
        for(let i = 1;i< view.length ; i++){
            songs[i-1] = view[i];
        }
    }
    else if(typeof view[0].collectionName != 'undefined'){
        name = view[0].collectionName;
        for(let i = 1;i< view.length ; i++){
            songs[i-1] = view[i];
        }
        image = `${baseURL}/song/get/image/${songs[0]?.id}`;
    }
    else {
        name = view[0].name;
        image = `${baseURL}/collection/get/image/${view[0]?.id}`;
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
        <button onClick={() => {setCollView(false)}} style={{backgroundImage:`url(${arrow})`}} className="GoBack"></button>
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
            songs.map((item, ind) => (
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
        <p>No more songs are available yet</p>
        </div> <br/><br/><br/><br/>
        </>
    )
}

export default CollectionsViewer;