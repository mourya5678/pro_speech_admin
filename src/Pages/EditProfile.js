import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { pipApiResponse, pipDateFormates, pipDateFormate, pipGetToken, pipGetUserData, pipSaveUserData } from '../Controllers/Pip'
import { Schema_edit_profile_form } from '../Controllers/Schema'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import { baseUrl, getProfileDataEndPointURL, updateUserProfileDataEndPointURL } from '../Routes/bakendRoutes'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from '../Controllers/Loader'

const EditProfile = () => {
    const navigate = useNavigate();
    const [isToggle, setIsToggle] = useState(false);
    const [isToggle1, setIsToggle1] = useState(false);
    const [fullName, setFullName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [gender, setGender] = useState('Male');
    const [profileImage, setProfileImage] = useState('');
    const [profileImageChange, setProfileImageChange] = useState('');
    const [isLoader, setIsLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        fullNameError: '',
        dateOfBirth: '',
        phone: '',
        gender: '',
        profileImage: ''
    })

    useEffect(() => {
        setIsLoader(true);
        const userData = pipGetUserData();
        setFullName(userData?.fullName ?? '');
        setEmail(userData?.email ?? '');
        setPhone(userData?.phone ?? '');
        setProfileImage(userData?.profileImage ?? '');
        setDateOfBirth(pipDateFormates(userData?.dateOfBirth) ?? '');
        setGender(userData?.gender ?? 'Male');
        setIsLoader(false);
    }, []);

    const onHandleSubmitData = async (e) => {
        e.preventDefault();
        const mobileNumberPattern = /^\d{10}$/;
        if (fullName && dateOfBirth && mobileNumberPattern.test(phone) && gender) {
            setIsLoader(true)
            setErrorMessage({
                ...errorMessage, fullNameError: '',
                dateOfBirth: '',
                phone: '',
                gender: '',
                profileImage: ''
            })
            const token = pipGetToken();
            const headers = {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
                Authorization: `Bearer ${token}`
            }
            const formData = new FormData();
            formData.append("fullName", fullName)
            formData.append("nickName", fullName)
            formData.append("dateOfBirth", pipDateFormates(dateOfBirth))
            formData.append("phone", phone)
            formData.append("gender", gender)
            if (profileImageChange) {
                formData.append("profileImage", profileImageChange)
            }
            var apiResponse = await pipApiResponse('put', `${baseUrl + updateUserProfileDataEndPointURL}`, headers, true, formData);
            setIsLoader(false);
            apiResponse?.success == true && getAdminProfileData();
        } else {
            setIsLoader(true);
            setErrorMessage({
                ...errorMessage, fullNameError: !fullName ? "Please enter fullName" : '',
                dateOfBirth: !dateOfBirth ? "Please select the Dob" : '',
                phone: !mobileNumberPattern.test(phone) ? "Please enter 10 digit phone number" : '',
                gender: !gender ? "Please select gender" : '',
            })
            setIsLoader(false);
        }
    };

    const getAdminProfileData = async () => {
        setIsLoader(true);
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + getProfileDataEndPointURL}`, headers, false);
        apiResponse?.success == true && pipSaveUserData(apiResponse?.profile);
        apiResponse?.success == true && navigate(-1);
        setIsLoader(false);
    };

    const handleDocumentsChange = (e) => {
        setProfileImageChange(e.target.files[0]);
    };

    const phoneNumberChange = (e) => {
        setPhone(e.target.value)
        const mobileNumberPattern = /^\d{10}$/;
        if (mobileNumberPattern.test(e.target.value)) {
            setErrorMessage({
                ...errorMessage,
                phone: "",
            })
        } else {
            setErrorMessage({
                ...errorMessage,
                phone: "Please enter 10 digit phone number",
            })
        }
    }

    return (
        <div className={`wrapper ct_main_dashboard ${isToggle ? "nav_open" : ""} ${isToggle1 ? "topbar_open" : ""}`}>
            <Sidebar />
            <div className="main-panel">
                <Header onClick={() => setIsToggle(!isToggle)} onPress={() => setIsToggle1(!isToggle1)} />
                <div className="container">
                    {isLoader == true ?
                        <Loader />
                        :
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
                                            <form className="pt-0">
                                                <div className="ct_proile_img ct_edit_profile_img text-center mx-auto mb-5">
                                                    <label for="ct_profile_edit">
                                                        <img src={profileImageChange ? URL.createObjectURL(profileImageChange) : profileImage ? profileImage : 'assets/img/user124.jpg'} alt="" />
                                                        <input
                                                            className={profileImageChange == '' && profileImage == "" ? 'form-control d-none' : 'form-control d-none'}
                                                            type="file" id="ct_profile_edit"
                                                            // multiple
                                                            onChange={handleDocumentsChange}
                                                            accept="image/*,application/pdf"
                                                        />
                                                        <i className="fa-solid fa-camera" style={{ top: "44%" }}></i>
                                                    </label>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 ">
                                                        <div className=" mb-4 ct_custom_input">
                                                            <label>Name</label>
                                                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" placeholder="Enter Name" />
                                                            {errorMessage?.fullNameError !== "" &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.fullNameError}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <div className="ct_custom_input mb-4">
                                                            <label className="mb-2">Email</label>
                                                            <input type="email" className="form-control" placeholder="Enter Email" value={email} readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <div className=" ct_custom_input mb-4">
                                                            <label className="mb-2">Number</label>
                                                            <input type="number" onWheel={() => document.activeElement.blur()} className="form-control" placeholder="Enter Number" value={phone} onChange={(e) => phoneNumberChange(e)} />
                                                            {errorMessage?.phone !== "" &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.phone}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <div className=" ct_custom_input mb-4">
                                                            <label> Dob</label>
                                                            <div className="w-100"><DatePicker
                                                                maxDate={new Date()}
                                                                className="form-control " onChange={(date) => setDateOfBirth(date)} selected={dateOfBirth} /></div>
                                                            {errorMessage?.dateOfBirth !== "" &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.dateOfBirth}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 ">
                                                        <div className=" mb-4">
                                                            <label className="mb-2">Please Select Gender</label>
                                                            <select className="form-select" aria-label="Floating label select example" value={gender} onChange={(e) => setGender(e.target.value)} >
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                            {errorMessage?.gender !== "" &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.gender}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-4">
                                                    <button type="submit" onClick={(e) => onHandleSubmitData(e)} className="ct_custom_btn mx-auto d-block"> Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default EditProfile
