import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import './AudioSlider.css';

function MyAudioPlayer({ url, setSongOver }) {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      const audioEl = playerRef.current?.audio?.current;
      if (audioEl) {
        audioEl.play().catch(err => {
          console.error("Autoplay failed:", err);
          setIsPlaying(false);
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
    <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      <AudioPlayer
        ref={playerRef} 
        src={url}
        autoPlay
        showJumpControls={false}
        layout="vertical"
        customAdditionalControls={[]}
        customVolumeControls={[]}
        showDownloadProgress={true}
        showFilledProgress={true}
        customControlsSection={[]} 
        onLoadStart={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setSongOver(true)}
        style={{
          backgroundColor:"white",
          border:"2px solid white",
          boxShadow:"none",
          height:"40px",
        }}
      />

      {
        (!isPlaying) ?
        <button onClick={handlePlayPause} style={{
        position:"relative",
        left:"540px",
        bottom:"52px", 
        backgroundColor:"white",
        border:"none",
        backgroundImage:`url(src/assets/play.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:"40px",
        width:"40px"
      }} className="playButton">
      </button> 
      : 
      <button onClick={handlePlayPause} style={{
        position:"relative",
        left:"540px",
        bottom:"52px", 
        backgroundColor:"white",
        border:"none",
        backgroundImage:`url(src/assets/pause.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:"40px",
        width:"40px"
      }} className="playButton">
      </button>
      }
    </div>
  );
}

export default MyAudioPlayer;
