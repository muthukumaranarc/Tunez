import './Category.css';

function Category(){
    const repeat = ["Happy", "Romance", "Sad", "Motivation", "Workout", "Party", "Relax", "Focus", "Energize", "Sleep"];
    return (
        <div className='category'>
            {
                repeat.map(( item, index) => (
                    <button key={index} className='box'>{item}</button>
                ))
            }
        </div>
    )
}

export default Category;