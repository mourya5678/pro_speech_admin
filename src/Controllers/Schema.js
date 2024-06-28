import * as Yup from 'yup';

export const Schema_login_form1 = Yup.object({
    email: Yup.string()
        .required("Please enter email address"),
    password: Yup.string()
        .required("Please enter your password")
        .min(8, "Password cannot be less then 8 characters")
});

export const Schema_forgot_form1 = Yup.object({
    email: Yup.string()
        .required("Please enter email address")
});

export const Schema_change_password = Yup.object({
    currentPassword: Yup.string()
        .required("Please enter your password")
        .min(8, "Password cannot be less then 8 characters"),
    newPassword: Yup.string()
        .required("Please enter your new password")
        .min(8, "Password cannot be less then 8 characters"),
    confirmPassword: Yup.string()
        .required("Please enter confirm password")
        .oneOf([Yup.ref("newPassword"), null], "Password and confirm password fields must be equal"),
});

export const Schema_otp_check = Yup.object({
    otp: Yup.string()
        .required("Please enter email address")
});

export const Schema_new_password = Yup.object({
    newPassword: Yup.string()
        .required("Please enter your new password")
        .min(8, "Password cannot be less then 8 characters"),
    confirmPassword: Yup.string()
        .required("Please enter confirm password")
        .oneOf([Yup.ref("newPassword"), null], "Password and confirm password fields must be equal"),
});