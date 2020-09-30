import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Router } from "@reach/router"
import Layout from './containers/Layout';
import PostList from './containers/PostList';
import PostCreate from './containers/PostCreate';
import PostDetail from './containers/PostDetail';
import PostUpdate from './containers/PostUpdate';
import Login from './containers/Login'
import Signup from './containers/Signup';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './context/AuthContext'
import { authenticationService } from './services';
import "./styles.css"

function App() {

  const [auth, setAuth] = useState(authenticationService.isAuthenticated);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Layout>
        <Router>
          <PostList path='/' />
          <PrivateRoute as={PostCreate} path='/create' />
          <PostDetail path='/posts/:postSlug' />
          <PrivateRoute as={PostUpdate} path='/posts/:postSlug/update' />
          <Login path='/login' />
          <Signup path='/signup' />
        </Router>
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
