import {Outlet} from "react-router-dom";
import {Header} from "../components";
import {useSelector} from "react-redux";

const MainLayout = () => {
    const {errors} = useSelector(state => state.auth);
    return (
        <div>
            <Header/>
            {errors && <div>{JSON.stringify(errors)}</div>}
            <hr/>
            <Outlet/>
        </div>
    )
};

export {MainLayout}