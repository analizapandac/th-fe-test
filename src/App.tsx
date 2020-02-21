import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Posts from './components/Posts';
import Post from './components/Post';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={'/posts/:postId'}>
          <Post />
          <ToastContainer />
        </Route>
        <Route exact path="/">
          <Posts />
          <ToastContainer />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
