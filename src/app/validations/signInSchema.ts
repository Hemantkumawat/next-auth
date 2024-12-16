import * as yup from 'yup';

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .max(100, 'Email must be at most 100 characters')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
});

export default signInValidationSchema;