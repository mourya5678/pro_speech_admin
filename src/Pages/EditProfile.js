import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { pipApiResponse, pipDateFormates, pipDateFormate, pipGetToken, pipGetUserData } from '../Controllers/Pip'
import { Schema_edit_profile_form } from '../Controllers/Schema'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import { baseUrl, updateUserProfileDataEndPointURL } from '../Routes/bakendRoutes'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditProfile = () => {
    const navigate = useNavigate();
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
        setDateOfBirth(pipDateFormates(new Date(userData?.dateOfBirth)) ?? '');
        setGender(userData?.gender ?? 'Male');
        setIsLoader(false);
    }, []);

    const onHandleSubmitData = async () => {
        if (fullName && dateOfBirth && phone && profileImage || profileImageChange && gender) {
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
            formData.append("dateOfBirth", pipDateFormate(dateOfBirth))
            formData.append("phone", phone)
            formData.append("gender", gender)
            formData.append("profileImage", profileImageChange ?? profileImage)
            var apiResponse = await pipApiResponse('put', `${baseUrl + updateUserProfileDataEndPointURL}`, headers, true, formData);
            setIsLoader(false)
            apiResponse?.success == true && navigate(-1)
        } else {
            setIsLoader(true)
            setErrorMessage({
                ...errorMessage, fullNameError: !fullName ? "Please enter fullName" : '',
                dateOfBirth: !dateOfBirth ? "Please select the Dob" : '',
                phone: !phone ? "Please enter 10 digit phone number" : phone?.length >= 10 ? "Please enter 10 digit phone number" : '',
                gender: !gender ? "Please select gender" : '',
                profileImage: !profileImage || !profileImageChange ? "Please select profile image" : ''
            })
            setIsLoader(false)
        }
    }

    const handleDocumentsChange = (e) => {
        setProfileImageChange(e.target.files[0]);
    }

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
                <Header />
                <div className="container">
                    {isLoader == true ?
                        <div class="ct_loader_main">
                            <div class="loader"></div>
                        </div>
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
                                                        <img src={profileImage ? profileImage : profileImageChange ? URL.createObjectURL(profileImageChange) : 'assets/img/user124.jpg'} alt="" />
                                                        <input
                                                            className={profileImageChange == '' && profileImage == "" ? 'form-control d-none' : 'form-control d-none'}
                                                            type="file" id="ct_profile_edit"
                                                            multiple
                                                            onChange={handleDocumentsChange}
                                                            accept="image/*,application/pdf"
                                                        />
                                                        <i className="fa-solid fa-camera" style={{ top: "44%" }}></i>
                                                    </label>
                                                    {errorMessage?.profileImage !== "" &&
                                                        <span style={{ color: "red" }}>
                                                            {errorMessage?.profileImage}
                                                        </span>
                                                    }
                                                </div>
                                                {console.log({ errorMessage })}
                                                <div className="row">
                                                    <div className="col-md-6 ">
                                                        <div className="form-floating mb-4 ct_custom_input">
                                                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="form-control" placeholder="Enter Name" />
                                                            <label>Name</label>
                                                            {errorMessage?.fullNameError !== "" &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.fullNameError}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <div className="form-floating ct_custom_input mb-4">
                                                            <input type="email" className="form-control" placeholder="Enter Email" value={email} readOnly />
                                                            <label>Email</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <div className="form-floating ct_custom_input mb-4">
                                                            <input type="number" className="form-control" placeholder="Enter Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                            <label>Number</label>
                                                            {errorMessage?.phone !== "" &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.phone}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <div className="form-floating ct_custom_input mb-4">
                                                            <div><DatePicker
                                                                className="form-control" onChange={(date) => setDateOfBirth(date)} selected={dateOfBirth} /></div>
                                                            <label> Dob</label>
                                                            {errorMessage?.dateOfBirth !== "" &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.dateOfBirth}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 ">
                                                        <div className="form-floating  mb-4">
                                                            <select className="form-select" aria-label="Floating label select example" value={gender} onChange={(e) => setGender(e.target.value)} >
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                            <label>Please Select Gender</label>
                                                            {errorMessage?.gender !== "" &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.gender}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-4">
                                                    <button type="button" onClick={onHandleSubmitData} className="ct_custom_btn mx-auto d-block"> Submit</button>
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
