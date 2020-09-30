import React, { useContext } from 'react';
import Login from '../containers/Login';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({ as: Component, ...props }) => {
    const { auth } = useContext(AuthContext);

    if (auth) {
        return <Component {...props} />
    }
    return <Login path="/login"/>
}


export default PrivateRoute;
