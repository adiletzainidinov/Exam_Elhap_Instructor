import React, { useEffect } from 'react';
import { clearUser } from '../store/userSlice/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchUser } from '../store/userSlice/userThunk';

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
    return <p>Loading user profile...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  if (!profile) {
    return <p>User profile not available.</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {profile.id}</p>
      <p>Username: {profile.userName}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default UserProfileComponent;
