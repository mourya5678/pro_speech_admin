import * as Yup from 'yup';

export const Schema_login_form1 = Yup.object({
    email: Yup.string()
        .required("* Email is required"),
    password: Yup.string()
        .required("Passwords is required")
        .min(8, "Password must contain at least 8 characters")
});

export const Schema_forgot_form1 = Yup.object({
    email: Yup.string()
        .required("* Email is required")
});

export const Schema_change_password = Yup.object({
    email: Yup.string()
        .required("* Email is required"),
    password: Yup.string()
        .required("Passwords is required")
        .min(8, "Password must contain at least 8 characters")
});