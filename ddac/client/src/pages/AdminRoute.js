// TODO: private route to redirect logged in users to homepage

import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const AdminRoute = () => {
    const {userDetails, isLoggedIn} = useSelector((store) => store.user);
    return (
        isLoggedIn && userDetails.role === 'merchant' ? <Outlet/> : <Navigate to="/"/>
    )
}

export default AdminRoute
