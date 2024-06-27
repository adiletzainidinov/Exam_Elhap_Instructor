import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch} from '../hooks/hooks';
import { signIn } from '../store/authSlice/authThunk'; // Импортируйте signIn
import { useNavigate } from 'react-router-dom'; // Импортируйте useNavigate

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
      navigate('/passvord');
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
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
      <Button onClick={handleClick} type="button" variant="text" size="large">
        Забыли пороль
      </Button>
    </Box>
  );
};

export default SignIn;
