import {
  createBrowserRouter,
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

const Layout = ()=> {
  return (
      <><Navbar /><Outlet /><Footer /></>
    );
};

const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/single",
        element: <Single/>,
      }

    ]
  },
]);

const App = () => {
  return <div className='App'>
    <div className='Container'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  </div>
};


export default App;