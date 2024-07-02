import React, { useState } from 'react';
import { pipApiResponse, pipSaveToken, pipSaveUserData } from '../Controllers/Pip';
import { Schema_login_form1 } from '../Controllers/Schema';
import { Formik } from 'formik';
import { pageRoutes } from '../Routes/pageRoutes';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../Controllers/ErrorMessage';
import { baseUrl, getProfileDataEndPointURL, loginEndPointURL } from '../Routes/bakendRoutes';
import EyeButton from '../Layout/EyeButton';

const Login = () => {
    const navigate = useNavigate();
    const [isLoader, setIsLoader] = useState(false);
    const [eyes, setEyes] = useState(false);
    const userData = {
        email: '',
        password: ''
    }

    const onHandleLogin = async (values, { resetForm }) => {
        setIsLoader(true);
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
        var apiResponse = await pipApiResponse('post', `${baseUrl + loginEndPointURL}`, headers, true, values);
        resetForm();
        pipSaveToken(apiResponse?.token);
        apiResponse ? apiResponse?.success == true && getUserProfileData(apiResponse?.token) : setIsLoader(false);
    }

    const getUserProfileData = async (token) => {
        setIsLoader(true);
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + getProfileDataEndPointURL}`, headers, false);
        pipSaveUserData(apiResponse?.profile);
        apiResponse?.success == true && navigate(pageRoutes?.home);
        setIsLoader(false);
    }

    return (
        <div className="container">
            <div className="col-md-5 mx-auto">
                <div className="ct_login_main_center">
                    <div className="ct_login_bg">
                        <div className="ct_login_head mb-5">
                            <h2 className="text-center">Welcome</h2>
                            <p className="mb-0 text-center">Sign in to continue</p>
                        </div>
                        {isLoader == true ?
                            <div className="ct_loader_main">
                                <div className="loader"></div>
                            </div>
                            :
                            <Formik
                                initialValues={userData}
                                validationSchema={Schema_login_form1}
                                onSubmit={(values, actions) => {
                                    onHandleLogin(values, actions)
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
                                                    placeholder="name@example.com"
                                                />
                                                <label>Email address</label>
                                                <ErrorMessage errors={errors} touched={touched} fieldName="email" />
                                            </div>
                                            <div className="form-floating ct_custom_input mb-2 position-relative">
                                                <input
                                                    type={eyes == true ? 'text' : 'password'}
                                                    className="form-control"
                                                    id="password"
                                                    value={values?.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="Password"
                                                />
                                                <label>Password</label>
                                                <EyeButton onClick={() => setEyes(!eyes)} data={eyes == false ? 'fa-eye-slash' : 'fa-eye'} />
                                                <ErrorMessage errors={errors} touched={touched} fieldName="password" />
                                            </div>
                                            <div className="text-end">
                                                <a href="javascript:void(0)" onClick={() => navigate(pageRoutes.forgotPassword)} className="ct_fs_16">Forgot Password?</a>
                                            </div>
                                            <div className="pt-4">
                                                <button type="button" className="ct_custom_btn mx-auto d-block " onClick={handleSubmit}> Submit</button>
                                            </div>
                                        </form>
                                    )
                                }
                            </Formik>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login