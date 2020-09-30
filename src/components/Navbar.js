import React, { useContext } from 'react'
import { Link, navigate } from '@reach/router'
import { Container, Menu, Dropdown } from 'semantic-ui-react'
import { authenticationService } from '../services'


const Navbar = ({ isLoggedIn, logout }) => {

    return (
        <div>
            <Menu fixed='top' inverted>
                <Container>
                <Link to={"/"}>
                    <Menu.Item as='li' header>
                        {/* <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> */}
                Solutions
                </Menu.Item></Link>
                    <Link to='/' ><Menu.Item as='li'>Posts</Menu.Item></Link>
                    <>
                        {isLoggedIn&& <Link to='/create' ><Menu.Item as='li'>Create a post</Menu.Item></Link>}
                        {isLoggedIn && (<Dropdown text='Profile' pointing className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Header>Profile</Dropdown.Header>
                                <Dropdown.Item onClick={() => {
                                    return (
                                        authenticationService.logout(),
                                        logout(),
                                        navigate('/login')
                                    )
                                }} >Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>)}
                    </>
                    <>
                        {!isLoggedIn && (<Link to='/login' ><Menu.Item as='li'>Login</Menu.Item></Link>)}
                        {!isLoggedIn && (<Link to='/signup' ><Menu.Item as='li'>Signup</Menu.Item></Link>)}
                    </>
                </Container>
            </Menu>
        </div>
    )

}

export default Navbar