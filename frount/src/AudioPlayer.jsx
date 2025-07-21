import { useRef, useState } from "react";

function AudioPlayer(){
    const audioRef = useRef(null);
    let [url, setUrl] = useState("http://localhost:8080/audio/");

    function change(val){
        let data = "http://localhost:8080/audio/" + val;
        setUrl(data);
 
        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play();
        }
    }

    
    return( 
        <>
            <audio ref={audioRef} controls>
                <source src={url} type="audio/mp3" />
            </audio> <br/><br/>
            <button onClick={() => {change("A")}}>Song A</button>
            <button onClick={() => {change("B")}}>Song b</button>
        </>
    );
}

export default AudioPlayer;