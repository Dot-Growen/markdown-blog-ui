import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Container } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext';

const Layout = ({ children }) => {

    const { auth, setAuth } = useContext(AuthContext);
    console.log("auth => " + auth)
    
    const logout = () => {
        setAuth(false)
    }

    return (
        <>
            <Navbar isLoggedIn={auth} logout={logout} />
            <Container text style={{ marginTop: '7em' }}>
                {children}
            </Container>
        </>
    );
}

export default Layout;
