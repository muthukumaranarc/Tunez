// import { useEffect, useState } from 'react';
import './Category.css';

function Category({setCollView}){
     const baseURL = import.meta.env.VITE_API_URL;
    const repeat = ["Happy", "Motivation", "Love", "Mass", "Devotional", "Sad","Romance" , "Fun", "Melody", "Follk"];

    const handleClick = (data) => {
        let input = "";
        if(data == "Happy") input = "Fun";
        else if(data == "Romance") input = "Love";
        else input = data
        fetch(`${baseURL}/search/get/category/${input}`, {
            method:"GET",
            credentials:"include"
        })
        .then(res => res.json())
        .then(out => setCollView([data, ...out]))
    }
    return (
        <div className='category'>
            {
                repeat.map(( item, index) => (
                    <button key={index} className='box' onClick={() => handleClick(item)}>{item}</button>
                ))
            }
        </div>
    )
}

export default Category;