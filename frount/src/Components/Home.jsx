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

    const baseURL = import.meta.env.VITE_API_URL;

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
        let sc = 192;
        if(window.innerWidth <= 768) sc = 161;
        setDisable(true);
        scrollRefC.current.scrollBy({left: -sc, behavior: 'smooth'});
        setTimeout(() => {
            setDisable(false);
        }, 500);
    };

    const scrollRightC = () => {
        let sc = 192;
        if(window.innerWidth <= 768) sc = 161;
        setDisable(true);
        const container = scrollRefC.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const newScroll = container.scrollLeft + sc;

        if (newScroll-100 > maxScroll) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: sc, behavior: 'smooth' });
        }
        setTimeout(() => {
            setDisable(false);
        }, 200);
    };

    const scrollLeftA = () => {
        let sc = 192;
        if(window.innerWidth <= 768) sc = 161;
        setDisable(true);
        scrollRefA.current.scrollBy({left: -sc, behavior: 'smooth'});
        setTimeout(() => {
            setDisable(false);
        }, 500);
    };

    const scrollRightA = () => {
        let sc = 192;
        if(window.innerWidth <= 768) sc = 161;
        setDisable(true);
        const container = scrollRefA.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const newScroll = container.scrollLeft + sc;
        
        if (newScroll-100 >= maxScroll) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: sc, behavior: 'smooth' });
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
                    backgroundImage: `url(${baseURL}/song/get/image/${dailyImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
            </button>
            <button className='ourNew' onClick={handleNewCollection}>
                <p>Try our new Collection</p>
                <div style={{
                    backgroundImage: `url(${baseURL}/song/get/image/${newImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
            </button>
        </div>


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
        </div>

        <div className='collForYou'>
            <div className='controlC'>
                <button className='left' onClick={scrollLeftC} disabled={disable}><img src={arrow} /></button>
                <button className='right' onClick={scrollRightC} disabled={disable}><img src={arrow}/></button>
            </div>
            <h2>Collections For you</h2>
            <div className='collectionsBlock' ref={scrollRefC}><div style={{width:"30px"}}/>
            {
                    collections.map((item) => (
                        <Collection key={item.id} collection={item} setCollView={setCollView}/>
                    ))
            }
            </div>
        </div>

        <div className='Artist'>
            <div className='controlA'>
                <button className='left' onClick={scrollLeftA} disabled={disable}><img src={arrow} /></button>
                <button className='right' onClick={scrollRightA} disabled={disable}><img src={arrow}/></button>
            </div>
            <h2>Artists</h2>
            <div className='artistBlock' ref={scrollRefA}><div style={{width:"30px"}}/>
            {
                    artists.map((item) => (
                        <Artist key={item.id} setCollView={setCollView} artist={item}/>
                    ))
            }
            </div>
        </div>
            <div className='thank'>
                <p>Thank you for visiting — this project is part of my developer portfolio.</p>
            </div>
        </>
    )
}

export default Home;