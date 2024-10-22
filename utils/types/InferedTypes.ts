import { SigninSchema, SignupSchema } from "@/validationSchema";
import * as yup from "yup";

export type SignInKeys = yup.InferType<typeof SigninSchema>;
export type SignUpKeys = yup.InferType<typeof SignupSchema>;
