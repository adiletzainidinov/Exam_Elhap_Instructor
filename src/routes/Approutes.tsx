import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from '../page/MainPage';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import PrivatRoute from './PrivatRoute';
import {} from 'react-redux';
import { RootState } from '../store/store';
import { useAppSelector } from '../hooks/hooks';
import ForgotPassword from '../page/ForgotPassword';
import ResetPassword from '../page/ResetPassword';

const Approutes: React.FC = () => {
  const { isAuth } = useAppSelector((state: RootState) => state.auth.userInfo);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PrivatRoute
          component={<MainPage />}
          fallbackPath={'/signIn'}
          isAuth={isAuth}
        />
      ),
    },
    {
      path: '/passvord',
      element: (
        <PrivatRoute
          component={<ForgotPassword />}
          fallbackPath={'/'}
          isAuth={!isAuth}
        />
      ),
    },
    {
      path: '/reset',
      element: (
        <PrivatRoute
          component={<ResetPassword />}
          fallbackPath={'/'}
          isAuth={!isAuth}
        />
      ),
    },
    {
      path: '/signIn',
      element: (
        <PrivatRoute
          component={<SignIn />}
          fallbackPath={'/'}
          isAuth={!isAuth}
        />
      ),
    },
    {
      path: '/signUp',
      element: (
        <PrivatRoute
          component={<SignUp />}
          fallbackPath={'/'}
          isAuth={!isAuth}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Approutes;
