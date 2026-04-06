import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 chars").required("Password is required"),
});

export const registerSchema = yup.object({
  name: yup.string().min(2, "Min 2 chars").required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 chars").required("Password is required"),
});
