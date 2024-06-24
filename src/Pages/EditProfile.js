import { Formik } from 'formik'
import React, { useState } from 'react'
import { Schema_edit_profile_form } from '../Controllers/Schema'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'

const EditProfile = () => {
    const [fullName, setFullName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState();
    const [profileImage, setProfileImage] = useState();

    let userData = {
        fullName: '',
        dateOfBirth: '',
        phone: '',
        profileImage: ''
    }

    const onHandleSubmitData = (values) => {
        console.log(values)
    }

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
                                            <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap w-100">
                                                <h4 className="card-title ct_fw_700 mb-0 text-center">Edit Profile</h4>
                                            </div>
                                        </div>
                                        <Formik
                                            initialValues={userData}
                                            validationSchema={Schema_edit_profile_form}
                                            onSubmit={(values, actions) => {
                                                onHandleSubmitData(values, actions)
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
                                                        <div className="ct_proile_img ct_edit_profile_img mx-auto mb-5">
                                                            <img src="assets/img/profile.jpg" alt="" />
                                                            <i className="fa-solid fa-camera"></i>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 ">
                                                                <div className="form-floating mb-4 ct_custom_input">
                                                                    <input type="text" className="form-control" id="floatingInput" placeholder="Enter Name" value="John Doe" />
                                                                    <label for="floatingInput">Name</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 ">
                                                                <div className="form-floating ct_custom_input mb-4">
                                                                    <input type="email" className="form-control" id="floatingPassword" placeholder="Enter Email" value="johndoe@gmail.com" readOnly />
                                                                    <label for="floatingPassword">Email</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 ">
                                                                <div className="form-floating ct_custom_input mb-4">
                                                                    <input type="number" className="form-control" id="floatingPassword" placeholder="Enter Number" value="9874563120" />
                                                                    <label for="floatingPassword">Number</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 ">
                                                                <div className="form-floating ct_custom_input mb-4">
                                                                    <input type="date" className="form-control" />
                                                                    <label for="floatingPassword">Dob</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 ">
                                                                <div className="form-floating  mb-4">
                                                                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                                                        {/* <option selected>Gender</option> */}
                                                                        <option value="1">Male</option>
                                                                        <option value="2">Female</option>
                                                                        <option value="3">Other</option>
                                                                    </select>
                                                                    <label for="floatingSelect">Please Select Gender</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="pt-4">
                                                            <button type="button" className="ct_custom_btn mx-auto d-block "> Submit</button>
                                                        </div>
                                                    </form>
                                                )
                                            }
                                        </Formik>
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

export default EditProfile
