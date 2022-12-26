import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {authActions} from "../../redux";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (data) => {
        const {error} = await dispatch(authActions.login({user: data}))
        // console.log(a)
        if (!error) navigate('/cars')
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <input placeholder={'username'} type={'text'} {...register('username')}/>
            <input placeholder={'password'} type={'text'} {...register('password')}/>
            <button>Login</button>
        </form>
    )
};

export {LoginForm}