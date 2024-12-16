import * as yup from 'yup';

const userValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(50, 'First name must be at most 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .max(50, 'Last name must be at most 50 characters')
    .required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .max(100, 'Email must be at most 100 characters')
    .required('Email is required'),
  phoneNumber: yup
    .string()
    .max(15, 'Phone number must be at most 15 characters')
    .nullable(),
  password: yup
    .string()
    .required('Password is required'),
  roleId: yup
    .string()
    .required('Role ID is required'),
  updatedBy: yup
    .string()
    .max(50, 'Updated by must be at most 50 characters')
    .nullable(),
});

export default userValidationSchema;