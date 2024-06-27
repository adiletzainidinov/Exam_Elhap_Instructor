import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { resetPassword } from '../store/authSlice/authThunk';

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
  // const navigate = useNavigate();
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        margin: 'auto',
        padding: 2,
        border: '1px solid #ccc',
        borderRadius: 8,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        '& .MuiTextField-root': {
          marginBottom: 20,
        },
        '& .MuiButton-root': {
          marginTop: 20,
        },
      }}
    >
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
      <Button type="submit" variant="contained" size="large">
        Сбросить пароль
      </Button>
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
    </Box>
  );
};

export default ResetPasswordPage;
