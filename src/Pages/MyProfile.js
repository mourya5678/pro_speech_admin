import React, { useEffect, useState } from 'react'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../Routes/pageRoutes';
import { baseUrl, getProfileDataEndPointURL } from '../Routes/bakendRoutes';
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';

const MyProfile = () => {
    const navigate = useNavigate();
    const [profileDetail, setProfileDetail] = useState({});

    useEffect(() => {
        getAdminProfileData();
    }, []);

    const getAdminProfileData = async () => {
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + getProfileDataEndPointURL}`, headers, false);
        console.log(apiResponse);
        setProfileDetail(apiResponse?.profile ?? {});
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
                                            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
                                                <h4 className="card-title ct_fw_700 mb-0">Profile</h4>
                                                <a href="javascript:void(0)" onClick={() => navigate(pageRoutes.editProfile, { state: profileDetail })}> <button className="ct_custom_btn w-auto"><i
                                                    className="fa-solid fa-pen me-2"></i>Edit Profile</button></a>
                                            </div>
                                        </div>
                                        <div className="ct_profile_detail">
                                            <div className="ct_proile_img">
                                                <img src="assets/img/profile.jpg" alt="" />
                                            </div>
                                            <div>
                                                {console.log(profileDetail)}
                                                <p>Name <span>:</span> {profileDetail?.fullName ?? ''}</p>
                                                <p>Email <span>:</span> {profileDetail?.email ?? ''}</p>
                                                <p>Number <span>:</span> {profileDetail?.phone ?? ''}</p>
                                                <p>Dob <span>:</span> {profileDetail?.email ?? ''}</p>
                                                <p>Gender <span>:</span> {profileDetail?.email ?? ''}</p>
                                            </div>
                                        </div>
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

export default MyProfile