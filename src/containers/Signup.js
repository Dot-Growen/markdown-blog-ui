import React, { useContext, useState } from 'react';
import { Header, Button, Container, Form } from 'semantic-ui-react'
import { navigate } from "@reach/router"
import Message from '../components/Message';
import { authenticationService } from '../services'
import AuthContext from '../context/AuthContext';

const Signup = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {auth, setAuth, setUser} = useContext(AuthContext);

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        authenticationService.signup(username, email, password, confirmPassword)
            .then(res => {
                localStorage.setItem("token", res.data.key)
                setLoading(false);
                setAuth(true)
                setUser(username)
                navigate('/')
            })
            .catch(error => {
                setLoading(false)
                setError("All fields are required" || error)
            })
    }

    if (authenticationService.isAuthenticated) {
        console.log(authenticationService.isAuthenticated)
        navigate("/")
    }

    return (
        <Container>
            <Header>Signup for an account</Header>
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
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Email'
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
                <Form.Field>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'
                    />
                </Form.Field>
                <Button primary fluid loading={loading} disabled={loading} type='submit'>Signup</Button>
            </Form>
        </Container>
    );
}

export default Signup;
