import { useEffect, useState } from 'react';
import './Search.css';
import Song from './Song';
import Collection from './Collection';
import Artist from './Artist';

export default function Search({searchData,  setSong, setPlay, setPlayAll, setSongs, setCollView}) {
    const baseURL = import.meta.env.VITE_API_URL;
    const [searchRes, setSearchRes] = useState(null);

    useEffect(() => {
        if(searchData != "" && searchData != " ") {
            fetch(`${baseURL}/search/${searchData}`)
            .then(res => res.json())
            .then(data => {console.log(data); setSearchRes(data)})
            .catch(error => console.log(error))
        }
        setCollView(false)
    }, [baseURL, searchData, setCollView])

    return (
        <>
        <div className='searchRes'>
            {
                (searchData == "") ? <p style={{textAlign:"center"}}>Search to get results</p> :
                (searchRes != null && 
                    ((searchRes[0]?.length != 0) ||
                    (searchRes[1]?.length != 0) ||
                    (searchRes[2]?.length != 0))
                ) ? <>

                <div className='songs'>
                    {
                        (searchRes[0].length != 0) ? <p>Songs</p> : <></>
                    }
                    {
                        searchRes[0]?.map(( item  ) => (
                            <Song 
                                key={item.id} 
                                data={item} 
                                songs={[]}
                                setSong={setSong} 
                                setPlay={setPlay} 
                                setPlayAll={setPlayAll} 
                                setSongs={setSongs}
                            />
                        ))
                    }
                </div> <br /><hr />

                <div className='collections'>
                    {
                        (searchRes[0].length != 0) ? <p>Collections</p> : <></>
                    }   
                    <div>
                        {
                            searchRes[1].map((item) => (
                                <Collection key={item.id} collection={item} setCollView={setCollView}/>
                            ))
                        }
                    </div>
                </div> <br /><hr />

                <div className='artists'>
                    {
                        (searchRes[0].length != 0) ? <p>Artists</p> : <></>
                    }
                    <div>
                        {
                            searchRes[2].map((item) => (
                                <Artist key={item.id} setCollView={setCollView} artist={item}/>
                            )) 
                        }
                    </div>
                </div> </>
            : <><p style={{textAlign:"center"}}>No results</p></>
            }
            </div>
        </>
    )
}