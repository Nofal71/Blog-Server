import './App.css';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import TextUtils from './Components/TextUtils';
import PostArea from './Components/PostArea';
import AlertMessage from './Components/Alert';
import { useState } from 'react';

const App = () => {
  const [alert, setAlert] = useState(false);
  const setAlertProp = ({ message, type }) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  };

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const authenticate = (loggedIn) => {
    if (localStorage.getItem('email')) {
      setUserLoggedIn(true)
    } else {
      setUserLoggedIn(loggedIn)
    }
  };


  return (
    <>
      <NavBar setAlert={setAlertProp} userLoggedIn={userLoggedIn} userLoggedOut={authenticate} />
      {alert &&
        <AlertMessage message={alert?.message} type={alert?.type} />
      }
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute userLoggedIn={userLoggedIn} UserLoggedIn={authenticate}>
              <TextUtils setAlert={setAlertProp} />
            </PrivateRoute>
          } 
        />
        <Route
          path='/postArea'
          element={<PostArea setAlert={setAlertProp} />}
        />
        <Route
          path='/login'
          element={<Login setAlert={setAlertProp} UserLoggedIn={authenticate} checkUser={userLoggedIn} />}
        />
        <Route
          path='/signup'
          element={<SignUp setAlert={setAlertProp} UserLoggedIn={authenticate} checkUser={userLoggedIn} />}
        />
      </Routes>
    </>
  );
};

export default App;
