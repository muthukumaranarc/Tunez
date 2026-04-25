import { useEffect, useRef, useState } from 'react';
import arrow from '../assets/arrow.png';
import Song from '../components/shared/Song.jsx';
import Collection from '../components/shared/Collection.jsx';
import Artist from '../components/shared/Artist.jsx';
import '../styles/Home.css';
import API_BASE_URL from '../api/apiConfig';

function Home({quickPick, collections, artists, dailyBeat, newCollection,setCollView, setSong, setPlay, setPlayAll, setSongs}) {
    const scrollRefS = useRef(null);
    const scrollRefC = useRef(null);
    const scrollRefA = useRef(null);
    let [disable, setDisable] = useState(false);
    let [dailyImg, setDailyImg] = useState("");
    let [newImg, setNewImg] = useState("");

    const baseURL = API_BASE_URL;

    useEffect(() => {
        try{
            if (dailyBeat && dailyBeat.length > 0) setDailyImg(dailyBeat[0]);
        }
        catch(exception) {
            setDailyImg("")
        }
    }, [dailyBeat])

    useEffect(() => {
        try{
            if (newCollection && newCollection.length > 0) {
                setNewImg(newCollection[0]);
            }
        }
        catch(exception) {
            setNewImg("")
        }
    }, [newCollection])

    const scroll = (ref, amount) => {
        setDisable(true);
        const container = ref.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        let newScroll = container.scrollLeft + amount;

        if (newScroll >= maxScroll + 50) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else if (newScroll < 0) {
            container.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: amount, behavior: 'smooth' });
        }

        setTimeout(() => setDisable(false), 500);
    };

    const handleDailyBeat = () => {
        setCollView(["Daily Beat", ...dailyBeat]);
    }

    const handleNewCollection = () => {
        setCollView(["New Collection", ...newCollection]); 
    }

    const handlePlayAll = () => {
        setPlay(false);
        setPlayAll(true);
        setSongs(quickPick);
        setTimeout(() => setPlay(true), 100);
    }

    return (
        <div className="Home fade-in">
            <div className='deColl'>
                <button className='dailyBeat' onClick={handleDailyBeat}>
                    <p>Daily Beat</p>
                    <div style={{ backgroundImage: `url(${baseURL}/song/get/image/${dailyImg?.id})` }} />
                </button>
                <button className='ourNew' onClick={handleNewCollection}>
                    <p>Try our new Collection</p>
                    <div style={{ backgroundImage: `url(${baseURL}/song/get/image/${newImg?.id})` }} />
                </button>
            </div>

            <section className='quickPick'>
                <div className='section-header'>
                    <h2>Quick picks</h2>
                    <div className='controls'>
                        <button className='playAll-btn' onClick={handlePlayAll}>Play All</button>
                        <button className='left' onClick={() => scroll(scrollRefS, -460)} disabled={disable}><img src={arrow} alt="prev"/></button>
                        <button className='right' onClick={() => scroll(scrollRefS, 460)} disabled={disable}><img src={arrow} alt="next"/></button>
                    </div>
                </div>
                <div className='songsBlock' ref={scrollRefS}>
                    {quickPick.map((item) => (
                        <Song 
                            key={item.id} 
                            data={item} 
                            songs={quickPick}
                            setSong={setSong} 
                            setPlay={setPlay} 
                            setPlayAll={setPlayAll} 
                            setSongs={setSongs}
                        />
                    ))}
                </div>
            </section>

            <section className='collForYou'>
                <div className='section-header'>
                    <h2>Collections For you</h2>
                    <div className='controls'>
                        <button className='left' onClick={() => scroll(scrollRefC, -200)} disabled={disable}><img src={arrow} alt="prev"/></button>
                        <button className='right' onClick={() => scroll(scrollRefC, 200)} disabled={disable}><img src={arrow} alt="next"/></button>
                    </div>
                </div>
                <div className='collectionsBlock' ref={scrollRefC}>
                    {collections.map((item) => (
                        <Collection key={item.id} collection={item} setCollView={setCollView}/>
                    ))}
                </div>
            </section>

            <section className='Artist'>
                <div className='section-header'>
                    <h2>Artists</h2>
                    <div className='controls'>
                        <button className='left' onClick={() => scroll(scrollRefA, -200)} disabled={disable}><img src={arrow} alt="prev"/></button>
                        <button className='right' onClick={() => scroll(scrollRefA, 200)} disabled={disable}><img src={arrow} alt="next"/></button>
                    </div>
                </div>
                <div className='artistBlock' ref={scrollRefA}>
                    {artists.map((item) => (
                        <Artist key={item.id} setCollView={setCollView} artist={item}/>
                    ))}
                </div>
            </section>

            <div className='thank'>
                <p>Thank you for visiting — this project is part of my developer portfolio.</p>
            </div>
        </div>
    )
}

export default Home;