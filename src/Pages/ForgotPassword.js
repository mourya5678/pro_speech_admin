import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Schema_forgot_form1 } from '../Controllers/Schema';
import { pageRoutes } from '../Routes/pageRoutes';
import { Formik } from 'formik';
import { pipApiResponse } from '../Controllers/Pip';
import ErrorMessage from '../Controllers/ErrorMessage';
import { baseUrl, forgotPasswordEndPointURL } from '../Routes/bakendRoutes';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [isLoader, setIsLoader] = useState(false);
    const userData = {
        email: '',
    }

    const onHandleSubmit = async (values, { resetForm }) => {
        setIsLoader(true);
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
        var apiResponse = await pipApiResponse('post', `${baseUrl + forgotPasswordEndPointURL}`, headers, true, values);
        resetForm();
        setIsLoader(false);
        apiResponse?.success == true && navigate(pageRoutes.otp_check, { state: { email: values?.email } });
    }

    return (
        <div className="container">
            <div className="col-md-5 mx-auto">
                <div className="ct_login_main_center">
                    <div className="ct_login_bg">
                        <div className="ct_login_head mb-5">
                            <h2 className="text-center">Forgot Password?</h2>
                        </div>
                        {isLoader == true ?
                            <div className="ct_loader_main">
                                <div className="loader"></div>
                            </div>
                            :
                            <Formik
                                initialValues={userData}
                                validationSchema={Schema_forgot_form1}
                                onSubmit={(values, actions) => {
                                    onHandleSubmit(values, actions)
                                }}
                            >
                                {
                                    ({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (
                                        <form className="pt-0">
                                            <div className="form-floating mb-4 ct_custom_input">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    value={values?.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder=""
                                                />
                                                <label>Email address</label>
                                                <ErrorMessage errors={errors} touched={touched} fieldName="email" />
                                            </div>
                                            <div className="text-end">
                                                <a href="javascript:void(0)" onClick={() => navigate(pageRoutes.login)} className="ct_fs_16">Sign in</a>
                                            </div>
                                            <div className="pt-4">
                                                <button type="button" className="ct_custom_btn mx-auto d-block" onClick={handleSubmit}> Submit</button>
                                            </div>
                                        </form>
                                    )
                                }
                            </Formik>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;