import { Formik } from 'formik';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ErrorMessage from '../Controllers/ErrorMessage';
import { pipApiResponse } from '../Controllers/Pip';
import { Schema_new_password } from '../Controllers/Schema';
import { baseUrl, newPasswordEndPointURL } from '../Routes/bakendRoutes';
import { pageRoutes } from '../Routes/pageRoutes';

const NewPassword = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isLoader, setIsLoader] = useState(false);
    console.log({ state })
    const initialData = {
        newPassword: '',
        confirmPassword: ''
    }

    const onHandleSubmit = async (values, { resetForm }) => {
        setIsLoader(true);
        const data = {
            email: state?.email,
            password: values?.newPassword
        }
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
        var apiResponse = await pipApiResponse('post', `${baseUrl + newPasswordEndPointURL}`, headers, true, data);
        setIsLoader(false);
        resetForm();
        apiResponse.success == true && navigate(pageRoutes?.login)
    }

    return (
        <div className="container">
            <div className="col-md-5 mx-auto">
                <div className="ct_login_main_center">
                    <div className="ct_login_bg">
                        <div className="ct_login_head mb-5">
                            <h2 className="text-center">New Password</h2>
                        </div>
                        {isLoader == true ?
                            <div className="ct_loader_main">
                                <div className="loader"></div>
                            </div>
                            :
                            <Formik
                                initialValues={initialData}
                                validationSchema={Schema_new_password}
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
                                            <div className="form-floating ct_custom_input mb-2">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="newPassword"
                                                    value={values?.newPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="New Password"
                                                />
                                                <label>New Password</label>
                                                <ErrorMessage errors={errors} touched={touched} fieldName="newPassword" />
                                            </div>
                                            <div className="form-floating ct_custom_input mb-2">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="confirmPassword"
                                                    value={values?.confirmPassword}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    placeholder="Confirm Password"
                                                />
                                                <label>Confirm Password</label>
                                                <ErrorMessage errors={errors} touched={touched} fieldName="confirmPassword" />
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
        </div>
    )
}

export default NewPassword