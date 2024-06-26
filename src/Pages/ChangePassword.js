import { Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../Controllers/ErrorMessage'
import { pipApiResponse, pipGetToken } from '../Controllers/Pip'
import { Schema_change_password } from '../Controllers/Schema'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import { baseUrl, changePasswordEndPointURL } from '../Routes/bakendRoutes'

const ChangePassword = () => {
    const navigate = useNavigate();
    const [isLoader, setIsLoader] = useState(false);

    const changePasswordField = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    const onHandleChangePassword = async (values, { resetForm }) => {
        setIsLoader(true);
        const token = pipGetToken();
        const data = {
            currentPassword: values?.currentPassword,
            newPassword: values?.newPassword
        }
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('post', `${baseUrl + changePasswordEndPointURL}`, headers, true, data);
        resetForm();
        setIsLoader(false);
        apiResponse?.success == true && navigate(-1);
    };

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
                <Header />
                <div className="container">
                    <div className="page-inner">
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <div className="card card-round">
                                    <div className="card-body">
                                        <div className="card-head-row card-tools-still-right mb-5">
                                            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
                                                <h4 className="card-title ct_fw_700 mb-0">Change Password</h4>
                                            </div>
                                        </div>
                                        {isLoader == true ?
                                            <div class="ct_loader_main">
                                                <div class="loader"></div>
                                            </div>
                                            :
                                            <Formik
                                                initialValues={changePasswordField}
                                                validationSchema={Schema_change_password}
                                                onSubmit={(values, actions) => {
                                                    onHandleChangePassword(values, actions)
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
                                                                <input type="password" className="form-control"
                                                                    value={values?.currentPassword}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    id="currentPassword" />
                                                                <label for="currentPassword">Current Passowrd</label>
                                                                <ErrorMessage errors={errors} touched={touched} fieldName="currentPassword" />
                                                            </div>
                                                            <div className="form-floating mb-4 ct_custom_input">
                                                                <input type="password" className="form-control"
                                                                    value={values?.newPassword}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    id="newPassword" />
                                                                <label for="newPassword">New Passowrd</label>
                                                                <ErrorMessage errors={errors} touched={touched} fieldName="newPassword" />
                                                            </div>
                                                            <div className="form-floating ct_custom_input mb-4">
                                                                <input type="password" className="form-control"
                                                                    value={values?.confirmPassword}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    id="confirmPassword" />
                                                                <label for="confirmPassword">Confirm Password</label>
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
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ChangePassword
