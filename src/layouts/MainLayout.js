import {Outlet} from "react-router-dom";
import {Header} from "../components";

const MainLayout = () => {
    return (
        <div>
            <Header/>
            <hr/>
            <Outlet/>
        </div>
    )
};

export {MainLayout}