import {
  createHashRouter,
  RouterProvider,
  // Route,
  Outlet,
} from 'react-router-dom'
import Login from './pages/Login.js'
import Write from './pages/Write.js'
import Register from './pages/Register.js'
import Single from './pages/Single.js'
import Home from './pages/Home.js'
import Footer from './components/Footer.js'
import Navbar from './components/Navbar.js'
import "./style.scss"
import VideoContainer from './pages/VideoContainer.js'

const Layout = ()=> {
  return (
      <><Navbar /><Outlet /><Footer /></>
    );
};

const router = createHashRouter([
  {
    path: "/", 
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/post/:id",
        element: <Single/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/videoContainer",
        element: <VideoContainer/>,
      },
      // {
      //   path: "/video",
      //   element:<Video/>,
      // }
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

const App = () => {
  return <div className='app'>
    <div className='container'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  </div>
};


export default App;