import { useState, useEffect } from 'react';
import Category from './Category';
import Collections from './Collections';
import CollectionsViewer from './CollectionsViewer';
import Explore from './Explorer';
import Home from './Home';
import PlaySong from './PlaySong.jsx';
import './Content.css';
import Setings from './Setings.jsx';

function Content({ page , collView, setCollView}) {
  const baseURL = import.meta.env.VITE_API_URL;

  const [playAll, setPlayAll] = useState(false);
  const [song, setSong] = useState({});
  const [songs, setSongs] = useState([]);
  const [play, setPlay] = useState(false);

  const [quickPick, setQuickPick] = useState([]);
  const [collections, setCollections] = useState([]);
  const [artists, setArtists] = useState([]);
  const [dailyBeat, setDailyBeat] = useState([]);
  const [newCollection, setNewCollection] = useState([]);
  const [privateColl, setPrivateColl] = useState([]);

  const [privateCollLoading, setPrivateCollLoading] = useState(false);

  // Quick Pick
  useEffect(() => {
    fetch(`${baseURL}/song/get/all/30`)
      .then(res => res.json())
      .then(data => setQuickPick(data))
      .catch(err => console.error("🔥 Error fetching QuickPick:", err))
  }, [baseURL]);

  // Collections
  useEffect(() => {
    fetch(`${baseURL}/collection/get/all/10`)
      .then(res => res.json())
      .then(data => setCollections(data))
      .catch(err => console.error("🔥 Error fetching Collections:", err))
  }, [baseURL]);

  // Artists
  useEffect(() => {
    fetch(`${baseURL}/artist/get/all/10`)
      .then(res => res.json())
      .then(data => setArtists(data))
      .catch(err => console.error("🔥 Error fetching Artists:", err))
  }, [baseURL]);

  // Daily Beat
  useEffect(() => {
    fetch(`${baseURL}/collection/get/DailyBeat`)
      .then(res => res.json())
      .then(data => setDailyBeat(data))
      .catch(err => console.error("🔥 Error fetching DailyBeat:", err))
  }, [baseURL]);

  // New Collection
  useEffect(() => {
    fetch(`${baseURL}/collection/get/NewCollection`)
      .then(res => res.json())
      .then(data => setNewCollection(data))
      .catch(err => console.error("🔥 Error fetching NewCollection:", err))
  }, [baseURL]);

  // Private Collection (with cookies)
  useEffect(() => {
    setPrivateCollLoading(true);
    fetch(`${baseURL}/privateCollection/get/all`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setPrivateColl(data))
      .catch(err => console.error("🔥 Error fetching PrivateCollection:", err))
      .finally(() => setPrivateCollLoading(false));
  }, [baseURL, privateCollLoading]);

  return (
    <div className='Content'>
          {
            (collView != null) ? 
            <CollectionsViewer
            setCollView={setCollView}
            view={collView}
            setSong={setSong}
            setPlay={setPlay}
            setPlayAll={setPlayAll}
            setSongs={setSongs}
            />
            : <>
            {(page === 'Home' || page === 'Explorer') && <Category />}
            {{
              Home: (
                <Home
                  quickPick={quickPick}
                  songs={songs}
                  collections={collections}
                  artists={artists}
                  dailyBeat={dailyBeat}
                  newCollection={newCollection}
                  setCollView={setCollView}
                  setSong={setSong}
                  setPlay={setPlay}
                  setPlayAll={setPlayAll}
                  setSongs={setSongs}
                />
              ),

              Explorer: (
                <Explore 
                  collections={collections} 
                  artists={artists} 
                  setCollView={setCollView}
                />
              ),

              Collection: (
                <Collections 
                  privateColl={privateColl} 
                  setCollView={setCollView}
                  setPrivateCollLoading={setPrivateCollLoading}
                />
              ),

              Setings: (
                <Setings />
              )
          }[page] || <p>Page Not Found</p>}
        </>
        }

      {play ? <PlaySong playAll={playAll} song={song} songs={songs} /> : <div />}
    </div>
  );
}

export default Content;
