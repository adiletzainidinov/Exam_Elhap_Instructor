import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUp } from '../store/authSlice/authThunk';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/hooks';
import { styled } from '@mui/material/styles';

interface IFormInput {
  email: string;
  password: string;
  userName: string;
  photo: string;
}

const INPUT_FIELD = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
  },
  {
    name: 'userName',
    label: 'Имя пользователя',
    type: 'text',
  },
  {
    name: 'photo',
    label: 'Фото (URL)',
    type: 'text',
  },
];

const schema = yup
  .object()
  .shape({
    email: yup.string().email('Неверная почта').required('Напишите email'),
    password: yup
      .string()
      .min(6, 'Пароль должен быть больше 6 символов')
      .max(16, 'Пароль должен быть меньше 16 символов')
      .required('Напишите пароль!'),
    userName: yup
      .string()
      .required('Введите имя пользователя')
      .min(3, 'Имя пользователя должно быть больше 3 символов'),
    photo: yup
      .string()
      .url('Введите корректный URL')
      .required('Введите URL фото'),
  })
  .required();

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await dispatch(signUp({ data, navigate }));
    } catch (error) {
      console.error('Error during signUp:', error);
    }
  };

  const handleAkk = () => {
    navigate('/signIn')
  }

  return (
    <StyledForm component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h1" gutterBottom>
        Регистрация
      </Typography>
      {INPUT_FIELD.map((item) => (
        <div key={item.name}>
          <TextField
            label={item.label}
            type={item.type}
            placeholder={item.label}
            {...register(item.name as keyof IFormInput)}
            error={!!errors[item.name as keyof IFormInput]}
            helperText={errors[item.name as keyof IFormInput]?.message}
            fullWidth
          />
        </div>
      ))}
      <Button type="submit" variant="contained" size="large">
        Добавить
      </Button>
      <Button onClick={handleAkk} type="button" variant="text" size="large">
        Уже есть аккаунт?
      </Button>
    </StyledForm>
  );
};

export default SignUp;

const StyledForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: '400px',
  margin: 'auto',
  padding: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  marginTop: '150px',
}));
