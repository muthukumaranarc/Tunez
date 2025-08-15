import { useState, useEffect } from 'react';
import Category from './Category';
import Collections from './Collections';
import CollectionsViewer from './CollectionsViewer';
import Explore from './Explorer';
import Home from './Home';
import PlaySong from './PlaySong.jsx';
import './Content.css';
import Setings from './Setings.jsx';
import Search from './Search.jsx';

function Content({ page , collView, setCollView, user, picUrl, setLogbut, get, setGet, searchStatus, searchData, setSearchStatus}) {
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

  const [playing, setPlaying] = useState(song);

    // ---- NEW: modal + fetch states ----
  const [showCollections, setShowCollections] = useState(false);
  // const [collections, setCollections] = useState([]);
  const [collectionsLoading, setCollectionsLoading] = useState(false);
  const [collError, setCollError] = useState("");
  const [adding, setAdding] = useState(false);

  

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

  const handleCollectionClick = async (collectionName) => {
    setAdding(true);
    try {
      const payload = [collectionName, String(playing.id)];
      const res = await fetch(`${baseURL}/privateCollection/add/song`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Add failed: HTTP ${res.status}`);
      setShowCollections(false);
    } catch (err) {
      console.error("Error adding song:", err);
      alert("Error adding song to collection. See console for details.");
    } finally {
      setAdding(false);
    }
  };

  const addToCollection = async () => {
    setShowCollections(true);
    setCollections([]);
    setCollError("");
    setCollectionsLoading(true);

    try {
      const res = await fetch(`${baseURL}/privateCollection/get/all`, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error(`Fetch failed: HTTP ${res.status}`);

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      // eslint-disable-next-line no-unused-vars
      } catch (e) {
        throw new Error("Response was not valid JSON: " + text.slice(0, 200));
      }

      if (!Array.isArray(data)) {
        throw new Error("Unexpected shape (expected an array).");
      }

      setCollections(data);
    } catch (err) {
      console.error("Error loading collections:", err);
      setCollError(
        (err && err.message) || "Could not load collections. Check console."
      );
    } finally {
      setCollectionsLoading(false);
    }
  };

  return (
  <div className="Content">

    {/* ✅ Search View */}
    {searchStatus && (
      <Search
        searchData={searchData}
        setSong={setSong}
        setPlay={setPlay}
        setPlayAll={setPlayAll}
        setSongs={setSongs}
        setCollView={setCollView}
      />
    )}

    {/* ✅ Collections Viewer */}
    {collView && (
      <CollectionsViewer
        setCollView={setCollView}
        view={collView}
        setSong={setSong}
        setPlay={setPlay}
        setPlayAll={setPlayAll}
        setSongs={setSongs}
        setSearchStatus={setSearchStatus}
      />
    )}

    {/* ✅ Main Pages */}
    {!searchStatus && !collView && (
      <>
        {(page === "Explorer") && <Category setCollView={setCollView}/>}

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
              user={user}
              get={get}
              setGet={setGet}
            />
          ),

          Setings: (
            <Setings user={user} picUrl={picUrl} setLogbut={setLogbut} />
          ),
        }[page] || <p>Page Not Found</p>}
      </>
    )}

    {/* ✅ Music Player */}
    {play && (
      <PlaySong
        playAll={playAll}
        song={song}
        songs={songs}
        playing={playing}
        setPlaying={setPlaying}
        addToCollection={addToCollection}
      />
    )}

    {/* ✅ Collections Modal */}
    {showCollections && (
      <div className="popup-overlay" role="dialog" aria-modal="true">
        <div className="popup-content">
          <div className="popup-header">
            <h3>Select Collection</h3>
            <button
              className="popup-close"
              onClick={() => setShowCollections(false)}
              disabled={adding}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {collectionsLoading && <p>Loading collections…</p>}

          {!collectionsLoading && collError && (
            <div className="popup-error">
              <p>{collError}</p>
              <button onClick={addToCollection}>Retry</button>
            </div>
          )}

          {!collectionsLoading && !collError && (
            <>
              {collections.length === 0 ? (
                <p>No collections found. Create one first.</p>
              ) : (
                <ul className="popup-list">
                  {collections.map((col) => (
                    <li key={col.id}>
                      <button
                        disabled={adding}
                        onClick={() =>
                          handleCollectionClick(col.collectionName)
                        }
                        title={col.collectionName}
                      >
                        {col.collectionName}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    )}
  </div>
);

}

export default Content;
