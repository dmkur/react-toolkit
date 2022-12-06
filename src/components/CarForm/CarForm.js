import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {carActions} from "../../redux";

const CarForm = () => {
    const {reset, register, handleSubmit, setValue} = useForm();
    const {carForUpdate, errors} = useSelector(state => state.cars);
    const dispatch = useDispatch();
    // console.log(carForUpdate, '+++++++++++++++++++++++++++++++++++++++')

    useEffect(() => {
        // тобто ми з нашого carForUpdate беремо дані
        // і вставляємо форму через setValue 'назва поля'
        if (carForUpdate) {
            setValue('model', carForUpdate.model)
            setValue('price', carForUpdate.price)
            setValue('year', carForUpdate.year)
        }
    }, [carForUpdate])

    const submit = async (data) => {
        await dispatch(carActions.updateCarById({id: carForUpdate.id, car: data}))
        reset()
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <input type={'text'} placeholder={'model'} {...register('model')}/>
            <input type={'text'} placeholder={'price'} {...register('price')}/>
            <input type={'text'} placeholder={'year'} {...register('year')}/>
            <button>Update</button>
            {errors && <div>{JSON.stringify(errors)}</div>}
        </form>
    )
};

export {CarForm};