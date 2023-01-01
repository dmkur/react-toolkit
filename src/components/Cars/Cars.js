import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";

import {Car} from "../Car/Car";
import {useEffect} from "react";
import {carActions} from "../../redux";

const Cars = () => {
    const {cars, next, prev} = useSelector(state => state.cars);
    const dispatch = useDispatch();
    const [query, setQuery] = useSearchParams({page: '1'});

    useEffect(() => {
        dispatch(carActions.getAll({page: query.get('page')}))
    }, [query])

    const prevPage = () => {
        const prev = +query.get('page') -1;
        setQuery({page:`${prev}`})
    };

    const nextPage = () => {
        const next = +query.get('page') +1;
        setQuery({page:`${next}`})
    };

    return (
        <div>
            <button disabled={!prev} onClick={prevPage}>Prev</button>
            <button disabled={!next} onClick={nextPage}>Next</button>
            {cars.map(car => <Car key={car.id} car={car}/>)}
        </div>
    );
};

export {Cars};