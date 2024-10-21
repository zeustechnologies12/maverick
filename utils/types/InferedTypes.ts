import { SignupSchema } from "@/validationSchema";
import * as yup from "yup";

export type SignUpKeys = yup.InferType<typeof SignupSchema>;
