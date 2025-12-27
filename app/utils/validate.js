import * as Yup from "yup";

export const AUTHSCHEMA = Yup.object().shape({
   mobile: Yup.string()
    .required("Please fill the mobile number")
    .matches(/^[0-9]+$/, "Mobile number must contain only digits")
    .length(10, "Mobile number must be exactly 10 digits"),
  countryCode: Yup.string()
    .required("Country code is required")
});

export const PROFILE_SCHEMA = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  role: Yup.string()
    .required("Role is required")
    .min(2, "Role must be at least 2 characters")
    .max(50, "Role cannot exceed 50 characters"),
});