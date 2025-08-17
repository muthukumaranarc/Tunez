import { useEffect, useRef, useState } from 'react';
import arrow from '../assets/arrow.png';
import Collection from './Collection.jsx';
import Artist from './Artist.jsx';
import "./Explorer.css";

function Explore({collections, artists, setCollView}) {

    let [coll, setColl] = useState([]);
    let [art, setArt] = useState([]);
    const scrollRefC = useRef(null);
    const scrollRefA = useRef(null);
    let [disable, setDisable] = useState(false);

    useEffect(() => {
        const shuffled = [...collections];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        } 
        setColl(shuffled);
    }, [collections]);

    useEffect(() => {
        const shuffled = [...artists];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        } 
        setArt(shuffled);
    }, [artists])

        
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

        if (newScroll-100 >= maxScroll) {
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

    return (
        <><br />
        <div className='EcollForYou'>
            <div className='EcontrolC'>
                <button className='left' onClick={scrollLeftC} disabled={disable}><img src={arrow} /></button>
                <button className='right' onClick={scrollRightC} disabled={disable}><img src={arrow}/></button>
            </div>
            <h2>Top Search Collections</h2>
            <div className='EcollectionsBlock' ref={scrollRefC}><div style={{width:"30px"}}/>
            {
                    coll.map((item) => (
                        <Collection key={item.id} collection={item} setCollView={setCollView}/>
                    ))
            }
            </div>
        </div><br /><br />

        <div className='EArtist'>
            <div className='EcontrolA'>
                <button className='left' onClick={scrollLeftA} disabled={disable}><img src={arrow} /></button>
                <button className='right' onClick={scrollRightA} disabled={disable}><img src={arrow}/></button>
            </div>
            <h2>Popular Artists</h2>
            <div className='EartistBlock' ref={scrollRefA}><div style={{width:"30px"}}/>
            {
                    art.map((item) => (
                        <Artist key={item.id} setCollView={setCollView} artist={item}/>
                    ))
            }
            </div>
        </div>
        </>
    )
}




export default Explore;