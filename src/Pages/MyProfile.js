import React, { useEffect, useState } from 'react'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../Routes/pageRoutes';
import { baseUrl, getProfileDataEndPointURL } from '../Routes/bakendRoutes';
import { pipApiResponse, pipDateFormate, pipGetToken, pipSaveUserData } from '../Controllers/Pip';

const MyProfile = () => {
    const navigate = useNavigate();
    const [profileDetail, setProfileDetail] = useState({});
    const [isLoader, setIsLoader] = useState(false);


    useEffect(() => {
        getAdminProfileData();
    }, []);

    const getAdminProfileData = async () => {
        setIsLoader(true);
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + getProfileDataEndPointURL}`, headers, false);
        setProfileDetail(apiResponse?.profile ?? {});
        apiResponse?.success == true && pipSaveUserData(apiResponse?.profile)
        setIsLoader(false);
    }

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
                {isLoader == true ?
                    <div className="ct_loader_main">
                        <div className="loader"></div>
                    </div>
                    :
                    <Header />
                }
                <div className="container">
                    {isLoader == true ?
                        <div className="ct_loader_main">
                            <div className="loader"></div>
                        </div>
                        :
                        <div className="page-inner">
                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <div className="card card-round">
                                        <div className="card-body">
                                            <div className="card-head-row card-tools-still-right mb-5">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
                                                    <h4 className="card-title ct_fw_700 mb-0">Profile</h4>
                                                    <a href="javascript:void(0)" onClick={() => navigate(pageRoutes.editProfile, { state: profileDetail })}> <button className="ct_custom_btn w-auto"><i
                                                        className="fa-solid fa-pen me-2"></i>Edit Profile</button></a>
                                                </div>
                                            </div>
                                            <div className="ct_profile_detail">
                                                <div className="ct_proile_img text-center">
                                                    <img src={profileDetail?.profileImage ?? 'assets/img/user124.jpg'} alt="" />
                                                </div>
                                                <div className="">
                                                    <p><span>Name</span> <span>:</span> <span>{profileDetail?.fullName ?? ''}</span></p>
                                                    <p><span>Email</span> <span>:</span> <span>{profileDetail?.email ?? ''}</span></p>
                                                    <p><span>Number</span> <span>:</span> <span>{profileDetail?.phone ?? ''}</span></p>
                                                    <p><span>Dob </span><span>:</span> <span>{pipDateFormate(profileDetail?.dateOfBirth) ?? ''}</span></p>
                                                    <p><span>Gender</span> <span>:</span> <span>{profileDetail?.gender ?? ''}</span></p>
                                                </div>
                                            </div>
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

export default MyProfile