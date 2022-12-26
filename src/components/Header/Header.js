import {useNavigate} from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div>Header</div>
            <div>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        </div>
    )
};

export {Header}