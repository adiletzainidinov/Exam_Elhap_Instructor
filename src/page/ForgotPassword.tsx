import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../hooks/hooks';
import { forgot } from '../store/authSlice/authThunk';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export interface IFormInput {
  email: string;
  frontEndUrl: string;
}

const INPUT_FIELD = [
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    autoComplete: 'email',
  },
  {
    name: 'frontEndUrl',
    label: 'frontEndUrl',
    type: 'text',
    autoComplete: 'url',
  },
];

const schema = yup
  .object()
  .shape({
    email: yup.string().email('Неверная почта').required('Напишите email'),
    frontEndUrl: yup.string().required('Введите URL'),
  })
  .required();

const ForgotPassword = () => {
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
      await dispatch(forgot({ data, navigate }));
    } catch (error) {
      console.error('Error during forgot password process:', error);
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
        Восстановление пароля
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
        Добавить
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
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
    </StyledForm>
  );
};

export default ForgotPassword;

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
