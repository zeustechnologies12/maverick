import * as yup from "yup";

export const SigninSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const SignupSchema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone_number: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  role: yup.string().required(),
});
