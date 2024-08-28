import './App.css';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import TextUtils from './Components/TextUtils';
import PostArea from './Components/PostArea';
import Post from './Components/Post';

const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <TextUtils />
            </PrivateRoute>
          }
        />
        <Route
          path='/postArea'
          element={
            <PostArea />
          }
        />
        <Route
          path='/currentPost'
          element={
            <Post />
          }
        />
        <Route
          path='/login'
          element={
            <Login />
          }
        />
        <Route
          path='/signup'
          element={
            <SignUp />
          }
        />
      </Routes>

    </>
  );
};

export default App;
