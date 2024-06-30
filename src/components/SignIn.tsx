import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../hooks/hooks';
import { signIn } from '../store/authSlice/authThunk';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export interface IFormInput {
  email: string;
  password: string;
}

const INPUT_FIELD = [
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    autoComplete: 'current-password',
  },
];

const schema = yup
  .object()
  .shape({
    email: yup.string().email('Неверная почта').required('Напишите email'),
    password: yup.string().required('Введите пароль'),
  })
  .required();

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log(data, 'data');
      dispatch(signIn({ data, navigate }));
    } catch (error) {
      console.error('Error during signIn:', error);
    }
  };

  const handleClick = () => {
    navigate('/password');
  };

  const handleRegister = () => {
    navigate('/signUp');
  };

  return (
    <StyledForm component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" component="h1" gutterBottom>
        Войти
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
            autoComplete={item.autoComplete}
            fullWidth
          />
        </div>
      ))}
      <Button type="submit" variant="contained" size="large">
        Войти
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={handleClick} type="button" variant="text" size="large">
          Забыли пороль?
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
    </StyledForm>
  );
};

export default SignIn;

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
