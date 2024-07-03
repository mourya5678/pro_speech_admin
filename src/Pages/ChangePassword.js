import { Formik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../Controllers/ErrorMessage'
import Loader from '../Controllers/Loader'
import { pipApiResponse, pipGetToken } from '../Controllers/Pip'
import { Schema_change_password } from '../Controllers/Schema'
import EyeButton from '../Layout/EyeButton'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import { baseUrl, changePasswordEndPointURL } from '../Routes/bakendRoutes'

const ChangePassword = () => {
    const navigate = useNavigate();
    const [isToggle, setIsToggle] = useState(false);
    const [isToggle1, setIsToggle1] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [eyes, setEyes] = useState({
        eye1: false,
        eye2: false,
        eye3: false
    })

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
        <div className={`wrapper ct_main_dashboard ${isToggle ? "nav_open" : ""} ${isToggle1 ? "topbar_open" : ""}`}>
            <Sidebar />
            <div className="main-panel">
                <Header onClick={() => setIsToggle(!isToggle)} onPress={() => setIsToggle1(!isToggle1)} />
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
                                            <Loader />
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
                                                            <div className="form-floating mb-4 ct_custom_input position-relative">
                                                                <input type={eyes?.eye1 == true ? 'text' : 'password'} className="form-control"
                                                                    value={values?.currentPassword}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    id="currentPassword" />
                                                                <EyeButton onClick={() => setEyes({ ...eyes, eye1: !eyes?.eye1 })} data={eyes?.eye1 == false ? 'fa-eye-slash' : 'fa-eye'} />
                                                                <label>Current Passowrd</label>
                                                                <ErrorMessage errors={errors} touched={touched} fieldName="currentPassword" />
                                                            </div>
                                                            <div className="form-floating mb-4 ct_custom_input position-relative">
                                                                <input type={eyes?.eye2 == true ? 'text' : 'password'} className="form-control"
                                                                    value={values?.newPassword}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    id="newPassword" />
                                                                <EyeButton onClick={() => setEyes({ ...eyes, eye2: !eyes?.eye2 })} data={eyes?.eye2 == false ? 'fa-eye-slash' : 'fa-eye'} />
                                                                <label for="newPassword">New Passowrd</label>
                                                                <ErrorMessage errors={errors} touched={touched} fieldName="newPassword" />
                                                            </div>
                                                            <div className="form-floating ct_custom_input mb-4 position-relative">
                                                                <input type={eyes?.eye3 == true ? 'text' : 'password'} className="form-control"
                                                                    value={values?.confirmPassword}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    id="confirmPassword" />
                                                                <EyeButton onClick={() => setEyes({ ...eyes, eye3: !eyes?.eye3 })} data={eyes?.eye3 == false ? 'fa-eye-slash' : 'fa-eye'} />
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
