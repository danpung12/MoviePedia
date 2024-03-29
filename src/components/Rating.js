import './Rating.css';

const RATING = [1,2,3,4,5];

function Star({selected = false, rating, onSelect, onHover}){
    const className = `Rating-star ${selected ? 'selected' :''}`;
    //onSelect값이 있으면 rating으로 초기화, 아니면 undefined값.
    const handleClick = onSelect ?() => onSelect(rating) : undefined;
    const handleOver = onHover ?() => onHover(rating) : undefined;
    return (<span 
                className={className}
                onClick={handleClick}
                onMouseOver={handleOver}
                >
        
        ★</span>);
}



function Rating({value = 0, onSelect, onHover, onMouseOut}){
    return(
        <div onMouseOut={onMouseOut}>
            {RATING.map((rating)=> (
                <Star key={rating} selected ={value>=rating} 
                rating={rating} onSelect={onSelect} onHover={onHover}
                />
            ))}
            {/* <Star selected ={value>=1} />
            <Star selected ={value>=2} />
            <Star selected ={value>=3} />
            <Star selected ={value>=4} />
            <Star selected ={value>=5} /> */}


        </div>


    );

}

export default Rating;