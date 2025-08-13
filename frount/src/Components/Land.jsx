import Content from './Content';
import Head from './Head';
import Menu from './Menu';

import './Land.css';

import { useState } from 'react';
import Login from './Login';

function Land() {
    let [logbut, setLogbut] = useState(false);
    let [menuState , setMenuState ] = useState(true);
    let [page, setPage] = useState("Home");
     const [collView, setCollView] = useState(null);
    return (
        <>
        {
            (logbut) ? <Login setLogbut={setLogbut}/> : <>
            <Head menuState = {menuState} setMenuState = {setMenuState} setLogbut={setLogbut}/>
            <div style={{height:"49px"}}></div>
            {
                (menuState) ? <Menu setPage={setPage} setCollView={setCollView}/> : <div></div> 
            }
            <div style={{display:'flex'}}>
                <div style={{width: menuState ? '260px' : '0px'}}></div> 
                <Content menuState = {menuState} page={page} collView={collView} setCollView={setCollView}/>
            </div>
            </>
        }
        
        </>
    )
}

export default Land;