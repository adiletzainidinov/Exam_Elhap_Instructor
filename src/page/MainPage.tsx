import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { logout, refresh } from '../store/authSlice/authThunk';
import { useNavigate } from 'react-router-dom';
import UserProfileComponent from '../components/UserProfile';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { refreshToken } = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      dispatch(refresh({ refreshToken }));
    }, 150000);
    return () => clearInterval(refreshInterval);
  }, [dispatch, refreshToken]);

  const handleLogout = () => {
    dispatch(logout({ navigate }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h1" gutterBottom sx={{ml: 28}}>
        MainPage
      </Typography>
      <UserProfileComponent />
      <Box  style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default MainPage;
