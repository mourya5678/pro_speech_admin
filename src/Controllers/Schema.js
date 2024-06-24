import * as Yup from 'yup';

export const Schema_login_form1 = Yup.object({
    email: Yup.string()
        .required("* Email is required"),
    password: Yup.string()
        .required("Passwords is required")
        .min(8, "Password must contain at least 8 characters")
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&'*+-.,:;<=>?^_`{|}~])/, "Strong passwords require at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character."),
});

export const Schema_forgot_form1 = Yup.object({
    email: Yup.string()
        .required("* Email is required")
});

export const Schema_edit_profile_form = Yup.object({
    fullName: Yup.string().required("* Email is required"),
    phone: Yup.string().min(10, "Minimum 10 digit is required").max(10, "Maximum 10 digit is required").required("Number is required"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    profileImage: Yup.string().required("Profile image is required")
})