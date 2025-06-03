import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .required("First name is required.")
    .min(5, "First name must be at least 5 characters long."),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),

  password: yup
    .string()
    .required("Password is required.")
    .min(5, "Password must be at least 5 characters long.")
    .max(20, "Password cannot be more than 20 characters long."),
  datebirth: yup.string().required("Date of Birth is required."),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(5, "Password must be at least 5 characters long.")
    .max(20, "Password cannot be more than 20 characters long."),
});

export const passwordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),

  password: yup
    .string()
    .required("Password is required.")
    .min(5, "Password must be at least 5 characters long.")
    .max(20, "Password cannot be more than 20 characters long."),
  datebirth: yup.string().required("Date of Birth is required."),
});

export const profileSchema = yup.object().shape({
  name: yup
    .string()
    .required("First name is required.")
    .min(5, "First name must be at least 5 characters long."),

  datebirth: yup.string().required("Date of Birth is required."),
});
