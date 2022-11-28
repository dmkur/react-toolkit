const Car = ({car}) => {
    const {model, year, price, id} = car

    return (
        <div>
            <div>Id: {id}</div>
            <div>Model: {model}</div>
            <div>Price: {price}</div>
            <div>Year: {year}</div>
            <hr/>
        </div>
    )
};

export {Car};