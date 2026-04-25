import AudioSlider from './AudioSlider';
import '../../styles/PlaySong.css';
import { useEffect, useRef, useState } from "react";
import prevImg from '../../assets/Previous.png';
import nextImg from '../../assets/next.png';
import playIcon from "../../assets/play.png";
import pauseIcon from "../../assets/pause.png";
import API_BASE_URL from '../../api/apiConfig';

function PlaySong({ playAll, song, songs, playing, setPlaying, addToCollection }) {

  const baseURL = API_BASE_URL;

  const [songOver, setSongOver] = useState(false);
  const indexRef = useRef(0);
  const audioRef = useRef(null);
  const [hidePrev, setHidePrev] = useState(true);
  const [hideNext, setHideNext] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setPlaying(song);
  }, [setPlaying, song])

  const updatePlayingSong = (newIndex) => {
    if (newIndex >= 0 && newIndex < songs.length) {
      indexRef.current = newIndex;
      setPlaying(songs[newIndex]);
      setHidePrev(newIndex === 0);
      setHideNext(newIndex === songs.length - 1);
    }
  };

  useEffect(() => {
    if (playAll && songs.length > 0) {
      updatePlayingSong(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playAll, songs]);

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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    }
    for (let i = 0; i < songs.length; i++) {
      if (playing.id === songs[i].id) {
        indexRef.current = i;
        break;
      }
    }
    setHidePrev(indexRef.current === 0);
    setHideNext(indexRef.current === songs.length - 1);
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
        className='image'
        style={{
          backgroundImage: `url(${baseURL}/song/get/image/${playing.id})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <h2>{playing.name}</h2>
      
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
        <button className='addSong' onClick={addToCollection} title="Add to collection">+</button>
        <button
          className='prev'
          disabled={hidePrev}
          onClick={prevFunction}
          style={{
            backgroundImage: `url(${prevImg})`,
            backgroundSize: '30px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />
        <button 
          onClick={handlePlayPause} 
          className="playButton"
          style={{
            backgroundImage:`url(${isPlaying ? pauseIcon : playIcon})`,
            backgroundSize: '30px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />
        <button
          className='next'
          disabled={hideNext}
          onClick={nextFunction}
          style={{
            backgroundImage: `url(${nextImg})`,
            backgroundSize: '30px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />
      </div>
    </div>
  );
}

export default PlaySong;
