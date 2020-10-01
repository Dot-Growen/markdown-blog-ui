import React, { useState } from 'react'
import { Link } from '@reach/router'
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';

const Navbar = (props) => {

    const [current, setCurrent] = useState("mail");

    const { isLoggedIn, logout } = props

    const handleClick = e => {
        console.log('click ', e);
        setCurrent({ current: e.key });
    };

    return (
        <Menu theme="dark" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="mail" icon={<MailOutlined />}>
                <Link to={'/'}>Solutions</Link>
            </Menu.Item>
            {isLoggedIn && <Menu.Item key="create" icon={<AppstoreOutlined />}>
                <Link to={'/create'}>Create a post</Link>
            </Menu.Item>}
            {isLoggedIn && <Menu.Item key="logout" onClick={() => logout()} icon={<AppstoreOutlined />}>
                Logout
            </Menu.Item>}
            {!isLoggedIn && <Menu.Item key="login" icon={<AppstoreOutlined />}>
                <Link to={'/login'}>Login</Link>
            </Menu.Item>}
            {!isLoggedIn && <Menu.Item key="signup" icon={<AppstoreOutlined />}>
                <Link to={'/signup'}>Signup</Link>
            </Menu.Item>}
        </Menu>
    );
}

export default Navbar

