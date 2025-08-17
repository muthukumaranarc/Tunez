import React, {  useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import './AudioSlider.css';

function MyAudioPlayer({ url, setSongOver, setIsPlaying, playerRef }) {
  
  
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
  }, [playerRef, setIsPlaying]);

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
    </div>
  );
}

export default MyAudioPlayer;
