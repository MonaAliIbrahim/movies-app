import React, { useState, useEffect } from "react";
import './App.scss';
import AuthContextProvider from '../../Shared/Context/AuthStore';
import MediaContextProvider from '../../Shared/Context/MediaStore';
import DetailsContextProvider from '../../Shared/Context/MediaDetailsStore';
import PersonDetailsStore from '../../Shared/Context/PersonDetailsStore';
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from '../../Shared/ProtectedRoute/ProtectedRoute'
import jwtDecode from "jwt-decode";
import MasterLayout from '../../MasterLayout/MasterLayout';
import NotFound from '../NotFound/NotFound';
const Home = React.lazy(() => import('../Home/Home'));
const Movies = React.lazy(() => import('../Movies/Movies'));
const MediaDetails = React.lazy(() => import('../MediaDetails/MediaDetails'));
const People = React.lazy(() => import('../People/People'));
const PersonDetails = React.lazy(() => import('../PersonDetails/PersonDetails'));
const TvShow = React.lazy(() => import('../TvShow/TvShow'));
const Login = React.lazy(() => import('../Login/Login'));
const Register = React.lazy(() => import('../Register/Register'));
const About = React.lazy(() => import('../About/About'));

function App() {

  const [userData, setUserData] = useState(null);

  let saveUserData = () => {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  const logout = () => {
    localStorage.removeItem('userToken');
    setUserData(null);
    return <Navigate to='/login'/>;
  }

  useEffect(() => {
    if(localStorage.getItem('userToken')){
      saveUserData();
    }
  }, [])

  let routes = createBrowserRouter([
    { path: '/', 
      element: <MasterLayout userData={userData} logout={logout} />, 
      errorElement: <NotFound/>, 
      children: [
        {index: true, element: <ProtectedRoute userData={userData}><Home/></ProtectedRoute>},
        {path: 'movies', element: <ProtectedRoute userData={userData}><Movies/></ProtectedRoute>},
        {path: 'tvShow', element: <ProtectedRoute userData={userData}><TvShow/></ProtectedRoute>},
        {path: ':type/:id', element: <ProtectedRoute userData={userData}><MediaDetails/></ProtectedRoute>},
        {path: 'people', element: <ProtectedRoute userData={userData}><People/></ProtectedRoute>},
        {path: 'people/:id', element: <ProtectedRoute userData={userData}><PersonDetails/></ProtectedRoute>},
        {path: 'about', element: <About/> },
        {path: 'login', element: <Login saveUserData={saveUserData} />},
        {path: 'register', element: <Register/>},
      ]
    }
  ], {basename: '/movies-app'})

  return (
    <AuthContextProvider>
      <MediaContextProvider>
        <DetailsContextProvider>
          <PersonDetailsStore>
            <RouterProvider router={routes}/>
          </PersonDetailsStore>
        </DetailsContextProvider>
      </MediaContextProvider>
    </AuthContextProvider>
  );
}

export default App;
