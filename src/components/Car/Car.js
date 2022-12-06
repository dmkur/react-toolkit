import {useDispatch} from "react-redux";
import {carActions} from "../../redux";

const Car = ({car}) => {
    const {model, year, price, id} = car

    const dispatch = useDispatch();

    return (
        <div>
            <div>Id: {id}</div>
            <div>Model: {model}</div>
            <div>Price: {price}</div>
            <div>Year: {year}</div>
            {/*при настисканні, ми передамо наш об'єкт(car) в слайс в carForUpdate*/}
            {/*щоб дістати в Form компоненті*/}
            <button onClick={() => dispatch(carActions.setCarForUpdate(car))}>
                Update car
            </button>
            <hr/>
        </div>
    )
};

export {Car};