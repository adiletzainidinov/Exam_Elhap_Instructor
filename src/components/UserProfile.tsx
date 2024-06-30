import React, { useEffect } from 'react';
import { clearUser } from '../store/userSlice/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchUser } from '../store/userSlice/userThunk';
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const UserProfileComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());

    return () => {
      dispatch(clearUser());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <p>
        <CircularProgress sx={{ position: 'relative', ml: 52 }} />
      </p>
    );
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  if (!profile) {
    return <p>User profile not available.</p>;
  }

  return (
    <StyledCard>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              alt={profile.userName}
              src={profile.photo}
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="div">
              {profile.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role: {profile.role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active: {profile.isActive ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created At: {profile.createdAt}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Updated At: {profile.updatedAt}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default UserProfileComponent;

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4),
}));
