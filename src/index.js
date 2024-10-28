import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Sigup from './pages/Sigup';
import Sigin from './pages/Sigin';
import VerificationPage from './pages/VerificationPage';
import LandingHome from './pages/LandingHome';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import AddWorkForm from './pages/AddWorkForm';








const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/",
        element:<LandingHome />
      },
      {
        path:"/Home",
        element:<Home />
      },
      {
        path:"/Footer",
        element:<Footer />
      },
      {
        path:"/About",
        element:<About />
      },
      {
        path:"/Services",
        element:<Services />
      },
      {
        path:"/Contact",
        element:<Contact />
      },
      {
        path:"/AddWorkForm",
        element:<AddWorkForm />
      },
      {
        path:"/Sigup",
        element:<Sigup />
      },
      {
        path:"/Sigin",
        element:<Sigin />
      },
      {
        path:"/Verificationpage",
        element:<VerificationPage />
      },
      {
        path:"/Profile",
        element:<Profile />,
        children:[
          {
            path:"/Profile/Logout",
            element:<Logout />
          }
        ]
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
