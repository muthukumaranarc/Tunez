import AudioSlider from './AudioSlider';
import './PlaySong.css';
import { useEffect, useRef, useState } from "react";
import prevImg from '../assets/Previous.png';
import nextImg from '../assets/next.png';

function PlaySong({ playAll, song, songs }) {
    const [songOver, setSongOver] = useState(false);
    const [playing, setPlaying] = useState(song);
    const indexRef = useRef(0);
    const audioRef = useRef(null);
    const [hidePrev, setHidePrev] = useState(true);
    const [hideNext, setHideNext] = useState(false);

    // Update playing song by index
    const updatePlayingSong = (newIndex) => {
        if (newIndex >= 0 && newIndex < songs.length) {
            indexRef.current = newIndex;
            setPlaying(songs[newIndex]);
            setHidePrev(newIndex === 0);
            setHideNext(newIndex === songs.length - 1);
        }
    };

    // Initial setup when playAll is true
    useEffect(() => {
        if (playAll && songs.length > 0) {
            updatePlayingSong(0); // Start from first song
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playAll, songs]);

    // Handle when song finishes
    useEffect(() => {
        if (songOver) {
            const nextIndex = indexRef.current + 1;
            if (nextIndex < songs.length) {
                updatePlayingSong(nextIndex);
            }
            setSongOver(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songOver, songs]);

    // Auto-play song when changed
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play();
        }
        for(let i=0;i<songs.length;i++){
            if(playing.id == songs[i].id) {
                indexRef.current = i;
            }
        }
        setHidePrev(!(indexRef.current != 0));
    }, [playing, songs]);

    const prevFunction = () => updatePlayingSong( indexRef.current - 1);

    const nextFunction = () => updatePlayingSong(indexRef.current + 1);

    const addToCollection = () => {
        
    }

    return (
        <div className='PlaySong'>
            <div style={{
                backgroundImage: `url(http://localhost:7000/song/get/image/${playing.id})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '60px',
                width: '60px',
                backgroundColor: 'rgba(217, 217, 217, 1)',
                borderRadius: '5px',
                margin: '10px',
                position: 'absolute'
            }}></div>
            <h2>{playing.name}</h2>
            <div className='player'>
                <AudioSlider
                    url={`http://localhost:7000/song/play/${playing.id}`}
                    ref={audioRef}
                    setSongOver={setSongOver}
                />
            </div>
            <button className='addSong' onClick={addToCollection}>+</button>
            <div className='playControl'>
                <button
                    className='prev'
                    disabled={hidePrev}
                    onClick={prevFunction}
                    style={{
                        backgroundImage: `url(${prevImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></button>
                <button
                    className='next'
                    disabled={hideNext}
                    onClick={nextFunction}
                    style={{
                        backgroundImage: `url(${nextImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                ></button>
            </div>
        </div>
    );
}

export default PlaySong;
