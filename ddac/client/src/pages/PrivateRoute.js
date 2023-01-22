// TODO: private route to redirect logged in users to homepage

import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
    const {isLoggedIn, userDetails} = useSelector((store) => store.user);
    return (
        isLoggedIn && userDetails.role === 'customer' ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoute
