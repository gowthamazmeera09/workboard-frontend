import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import VerificationPage from './pages/VerificationPage';
import LandingHome from './pages/LandingHome';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import AddWorkForm from './pages/AddWorkForm';
import Totalworks from './pages/Totalworks';
import Buttons from './pages/Buttons';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Help from './pages/Help';
import RequestPasswordReset from './pages/RequestPasswordReset';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingHome />
      },
      {
        path: "/Home",
        element: <Home />
      },
      {
        path: "/Buttons",
        element: <Buttons />
      },
      {
        path: "/Footer",
        element: <Footer />
      },
      {
        path: "/Contact",
        element: <Contact />
      },
      {
        path: "/AddWorkForm",
        element: <AddWorkForm />
      },
      {
        path: "/Totalworks",
        element: <Totalworks />
      },
      {
        path: "/Signup",
        element: <Signup />
      },
      {
        path: "/Login",
        element: <Login />
      },
      {
        path: "/Verificationpage",
        element: <VerificationPage />
      },
      {
        path: "/Profile",
        element: <Profile />
      },
      {
        path: "/Help",
        element: <Help />
      },
      {
        path: "/requestpasswordreset",
        element: <RequestPasswordReset />
      },
      {
        path: "/verify-otp",
        element: <VerifyOTP />
      },
      {
        path: "/reset-password",
        element: <ResetPassword />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
