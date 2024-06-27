import { Button } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { logout } from '../store/authSlice/authThunk';
import { useNavigate } from 'react-router-dom';
import UserProfileComponent from '../components/UserProfile';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout({ navigate }));
  };

  return (
    <div>
      <h1>MainPage</h1>
      <UserProfileComponent />
      <div>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
