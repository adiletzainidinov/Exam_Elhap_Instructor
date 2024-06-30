import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { resetPassword } from '../store/authSlice/authThunk';
import { styled } from '@mui/material/styles';

interface IFormInput {
  newPassword: string;
  confirmNewPassword: string;
}

const schema = yup
  .object()
  .shape({
    newPassword: yup
      .string()
      .min(6, 'Пароль должен быть больше 6 символов')
      .max(16, 'Пароль должен быть меньше 16 символов')
      .required('Напишите пароль!'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Пароли не совпадают')
      .required('Подтвердите пароль'),
  })
  .required();

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { message } = useAppSelector((state) => state.auth.userInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (token) {
      dispatch(resetPassword({ token, newPassword: data.newPassword }));
    }
  };

  const handleToComeIn = () => {
    navigate('/signIn');
  };

  const handleRegister = () => {
    navigate('/signUp');
  };

  return (
    <StyledForm component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h1" gutterBottom>
        Сброс пароля
      </Typography>
      <TextField
        label="Новый пароль"
        type="password"
        placeholder="Новый пароль"
        {...register('newPassword')}
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Подтвердите новый пароль"
        type="password"
        placeholder="Подтвердите новый пароль"
        {...register('confirmNewPassword')}
        error={!!errors.confirmNewPassword}
        helperText={errors.confirmNewPassword?.message}
        fullWidth
        variant="outlined"
      />
      <Button fullWidth type="submit" variant="contained" size="large">
        Сбросить пароль
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 ,width: 400}}>
        <Button
          onClick={handleToComeIn}
          type="button"
          variant="text"
          size="large"
        >
          Войти
        </Button>
        <Button
          onClick={handleRegister}
          type="button"
          variant="text"
          size="large"
        >
          Зарегистрироватся
        </Button>
      </Box>
      {message && (
        <h1
          style={{
            textAlign: 'center',
            marginTop: 16,
            color: message.includes('успешно') ? 'green' : 'red',
          }}
        >
          {message}
        </h1>
      )}
    </StyledForm>
  );
};

export default ResetPasswordPage;

const StyledForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: 'auto',
  padding: theme.spacing(4),
  border: '1px solid #ccc',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  '& .MuiTextField-root': {
    marginBottom: theme.spacing(2.5),
  },
  '& .MuiButton-root': {
    marginTop: theme.spacing(2.5),
  },
  marginTop: '150px',
}));
