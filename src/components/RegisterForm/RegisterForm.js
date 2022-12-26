import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

const RegisterForm = () => {
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch();

    const submit = (data) => {
        // console.log(data)

    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <input placeholder={'username'} type={'text'} {...register('username')}/>
            <input placeholder={'password'} type={'text'} {...register('password')}/>
            <button>Register</button>
        </form>
    )
};

export {RegisterForm}