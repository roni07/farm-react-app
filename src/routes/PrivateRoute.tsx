import {Navigate, Outlet} from 'react-router-dom';

interface PrivateRoutProps {
    isLogin: boolean
}

const PrivateRoute = ({isLogin}: PrivateRoutProps) => {
    return (isLogin ? <Outlet/> : <Navigate to={"/"}/>);
}

export default PrivateRoute;
