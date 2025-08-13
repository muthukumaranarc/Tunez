import { useEffect, useRef, useState } from 'react';
import arrow from '../assets/arrow.png';
import Song from './Song.jsx';
import Collection from './Collection.jsx';
import Artist from './Artist.jsx';
import './Home.css';

function Home({quickPick, collections, artists, dailyBeat, newCollection,setCollView, setSong, setPlay, setPlayAll, setSongs}) {
    const scrollRefS = useRef(null);
    const scrollRefC = useRef(null);
    const scrollRefA = useRef(null);
    let [disable, setDisable] = useState(false);
    let [dailyImg, setDailyImg] = useState("");
    let [newImg, setNewImg] = useState("");

    useEffect(() => {
        try{
            setDailyImg(dailyBeat[0].id);
        }
        // eslint-disable-next-line no-unused-vars
        catch(exception) {
            setDailyImg("")
        }
    }, [dailyBeat])

    useEffect(() => {
        try{
            setNewImg(newCollection[0].id);
        }
        // eslint-disable-next-line no-unused-vars
        catch(exception) {
            setNewImg("")
        }
    }, [newCollection])

    const scrollLeftS = () => {
        setDisable(true);
        scrollRefS.current.scrollBy({left: -460, behavior: 'smooth'});
        setTimeout(() => {
            setDisable(false);
        }, 500);
    };

    const scrollRightS = () => {
        setDisable(true);
        const container = scrollRefS.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const newScroll = container.scrollLeft + 460;

        if (newScroll >= maxScroll) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: 460, behavior: 'smooth' });
        }
        setTimeout(() => {
            setDisable(false);
        }, 500);
    };

    const scrollLeftC = () => {
        setDisable(true);
        scrollRefC.current.scrollBy({left: -192, behavior: 'smooth'});
        setTimeout(() => {
            setDisable(false);
        }, 500);
    };

    const scrollRightC = () => {
        setDisable(true);
        const container = scrollRefC.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const newScroll = container.scrollLeft + 192;

        if (newScroll >= maxScroll) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: 192, behavior: 'smooth' });
        }
        setTimeout(() => {
            setDisable(false);
        }, 200);
    };

    const scrollLeftA = () => {
        setDisable(true);
        scrollRefA.current.scrollBy({left: -200, behavior: 'smooth'});
        setTimeout(() => {
            setDisable(false);
        }, 500);
    };

    const scrollRightA = () => {
        setDisable(true);
        const container = scrollRefA.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const newScroll = container.scrollLeft + 185;
        
        if (newScroll >= maxScroll) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: 200, behavior: 'smooth' });
        }
        setTimeout(() => {
            setDisable(false);
        }, 200);
    };

    const handleDailyBeat = () => {
        dailyBeat = ["Daily Beat" , ...dailyBeat] 
        setCollView(dailyBeat);
    }

    const handleNewCollection = () => {
        dailyBeat = ["New Collection" , ...newCollection] 
        setCollView(dailyBeat); 
    }

    const handlePlayAll = () => {
        setPlay(false);
        setPlayAll(true);
        setSongs(quickPick);
        setTimeout(() => {
            setPlay(true);
        }, 100);
    }

    
    return (
        <>
        <div className='deColl'>
            <button className='dailyBeat' onClick={handleDailyBeat}>
                <p>Daily Beat</p>
                <div style={{
                    backgroundImage: `url(http://localhost:7000/song/get/image/${dailyImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
            </button>
            <button className='ourNew' onClick={handleNewCollection}>
                <p>Try our new Collection</p>
                <div style={{
                    backgroundImage: `url(http://localhost:7000/song/get/image/${newImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
            </button>
        </div><br/><br/>


        <div className='quickPick'>
        <div className='controlS'>
            <button className='playAll' onClick={handlePlayAll}>Play All</button>
            <button className='left' onClick={scrollLeftS} disabled={disable}><img src={arrow} /></button>
            <button className='right' onClick={scrollRightS} disabled={disable}><img src={arrow}/></button>
        </div>
        <h2>Quick picks</h2>
        <div className='songsBlock' ref={scrollRefS}>
        {
            quickPick.map(( item  ) => (
                <Song 
                    key={item.id} 
                    data={item} 
                    songs={quickPick}
                    setSong={setSong} 
                    setPlay={setPlay} 
                    setPlayAll={setPlayAll} 
                    setSongs={setSongs}
                />
            ))
        }
        </div>
        </div><br/><br/>

        <div className='collForYou'>
            <div className='controlC'>
                <button className='left' onClick={scrollLeftC} disabled={disable}><img src={arrow} /></button>
                <button className='right' onClick={scrollRightC} disabled={disable}><img src={arrow}/></button>
            </div>
            <h2>Collections For you</h2>
            <div className='collectionsBlock' ref={scrollRefC}>
            {
                    collections.map((item) => (
                        <Collection key={item.id} collection={item} setCollView={setCollView}/>
                    ))
            }
            </div>
        </div><br /><br />

        <div className='Artist'>
            <div className='controlA'>
                <button className='left' onClick={scrollLeftA} disabled={disable}><img src={arrow} /></button>
                <button className='right' onClick={scrollRightA} disabled={disable}><img src={arrow}/></button>
            </div>
            <h2>Artists</h2>
            <div className='artistBlock' ref={scrollRefA}>
            {
                    artists.map((item) => (
                        <Artist key={item.id} setCollView={setCollView} artist={item}/>
                    ))
            }
            </div>
            <div className='thank'>
                <p>Thank you for visiting — this project is part of my developer portfolio.</p>
            </div>
        </div>
        </>
    )
}

export default Home;