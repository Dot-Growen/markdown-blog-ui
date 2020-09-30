import React, { useContext, useState } from 'react';
import { Header, Button, Container, Form } from 'semantic-ui-react'
import { navigate } from "@reach/router"
import Message from '../components/Message';
import { authenticationService } from '../services'
import AuthContext from '../context/AuthContext';

const Login = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {setAuth} = useContext(AuthContext);
    

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        authenticationService.login(username, password)
            .then(res => {
                localStorage.setItem("token", res.data.key)
                setLoading(false);
                setAuth(true)
                navigate('/')
            })
            .catch(error => {
                setLoading(false)
                setError("Invalid credentials, please try again." || error)
            })
    }

    if (authenticationService.isAuthenticated) {
        navigate("/")
    }

    return (
        <Container>
            <Header>Login to your account</Header>
            {error && (
                <Message color='red' message={error} />
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder='Username'
                    />
                </Form.Field> 
                <Form.Field>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                </Form.Field>
                <Button primary fluid loading={loading} disabled={loading} type='submit'>Login</Button>
            </Form>
        </Container>
    );
}

export default Login;
