import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import { refreshUser } from './redux/auth/operations';

import Layout from "./components/Layout/Layout";
import RestrictedRoute from './components/RestrictedRoute';
import PrivateRoute from './components/RestrictedRoute';

import './App.css'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));

export default function App() {
  const dispatch = useDispatch();
 useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return(
    <div>
       <Layout>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
          path="/register"
          element={<RestrictedRoute component={<RegistrationPage />} />}
        />
                <Route
          path="/login"
          element={<RestrictedRoute component={<LoginPage />} />}
        />
        <Route
          path="/contacts"
          element={<PrivateRoute component={<ContactsPage />} />}
        />
      </Routes>
      </Layout>
    </div>
  )
}