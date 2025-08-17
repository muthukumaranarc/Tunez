import AudioSlider from './AudioSlider';
import './PlaySong.css';
import { useEffect, useRef, useState } from "react";
import prevImg from '../assets/Previous.png';
import nextImg from '../assets/next.png';

function PlaySong({ playAll, song, songs, playing, setPlaying, addToCollection }) {

  const baseURL = import.meta.env.VITE_API_URL;

  const [songOver, setSongOver] = useState(false);
  const indexRef = useRef(0);
  const audioRef = useRef(null);
  const [hidePrev, setHidePrev] = useState(true);
  const [hideNext, setHideNext] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setPlaying(song);
  }, [setPlaying, song])

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
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked; ignore
      });
    }
    for (let i = 0; i < songs.length; i++) {
      if (playing.id === songs[i].id) {
        indexRef.current = i;
        break;
      }
    }
    setHidePrev(!(indexRef.current !== 0));
  }, [playing, songs]);

  const prevFunction = () => updatePlayingSong(indexRef.current - 1);
  const nextFunction = () => updatePlayingSong(indexRef.current + 1);

  const playerRef = useRef(null);
  
  const handlePlayPause = () => {
    const audioEl = playerRef.current?.audio?.current;
    if (!audioEl) return;

    if (audioEl.paused) {
      audioEl.play();
      setIsPlaying(true);
    } else {
      audioEl.pause();
      setIsPlaying(false);
    }
  };
  

  return (
    <div className='PlaySong'>
      <div
        style={{
          backgroundImage: `url(${baseURL}/song/get/image/${playing.id})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} className='image'
      />
      <h2>{(playing.name?.length > 14 && window.innerWidth < 768) ? playing.name.slice(0, 14) + ".." : playing.name}</h2>
      <div className='player'>
        <AudioSlider
          url={`${baseURL}/song/play/${playing.id}`}
          ref={audioRef}
          setSongOver={setSongOver}
          setIsPlaying={setIsPlaying}
          playerRef={playerRef}
        />
      </div>

      <div className='playControl'>
        <button className='addSong' onClick={addToCollection}>+</button>
        <button
          className='prev'
          disabled={hidePrev}
          onClick={prevFunction}
          style={{
            backgroundImage: `url(${prevImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {
          (!isPlaying) ?
          <button onClick={handlePlayPause} style={{
            backgroundImage:`url(src/assets/play.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} className="playButton">
          </button> 
        : 
          <button onClick={handlePlayPause} style={{
            backgroundImage:`url(src/assets/pause.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} className="playButton">
        </button>
        }
        <button
          className='next'
          disabled={hideNext}
          onClick={nextFunction}
          style={{
            backgroundImage: `url(${nextImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
    </div>
  );
}

export default PlaySong;
