import React, { useEffect, useState } from 'react'
import { pipApiResponse, pipDeleteToken, pipGetToken, pipGetUserData } from '../Controllers/Pip';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../Routes/pageRoutes';
import { baseUrl } from '../Routes/bakendRoutes';

const Header = ({ onClick, onPress }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const profileData = pipGetUserData();
        // console.log(profileData)
        setUserData(profileData);
    }, []);

    const onHandleLogout = () => {
        const data = pipDeleteToken();
        // console.log(data)
        navigate(pageRoutes.login)
    };


    return (
        <>
            <div className="main-header">
                <div className="main-header-logo">
                    <div className="logo-header" data-background-color="light">
                        <a href="javascript:void(0)" className="logo">
                            <img src="assets/img/logo.png" alt="navbar brand" className="navbar-brand" />
                        </a>
                        <div className="nav-toggle" onClick={onClick}>
                            <button className="btn btn-toggle toggle-sidebar">
                                <i className="gg-menu-right"></i>
                            </button>
                            <button className="btn btn-toggle sidenav-toggler">
                                <i className="gg-menu-left"></i>
                            </button>
                        </div>
                        <button className="topbar-toggler more" onClick={onPress}>
                            <i className="gg-more-vertical-alt"></i>
                        </button>
                    </div>
                </div>
                <nav
                    className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom"

                >
                    <div className="container-fluid">
                        <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                            <li className="nav-item topbar-user dropdown hidden-caret">
                                <a
                                    className={toggle ? "dropdown-toggle profile-pic show" : "dropdown-toggle profile-pic"}
                                    data-bs-toggle="dropdown"
                                    href="javascript:void(0)"
                                    aria-expanded={toggle ? "true" : "false"}
                                >
                                    <div className="avatar-sm">
                                        <img
                                            src={userData?.profileImage != "" ? userData?.profileImage ?? 'assets/img/user124.jpg' : 'assets/img/user124.jpg'}
                                            alt="..."
                                            className="avatar-img rounded-circle"
                                        />
                                    </div>
                                    <span className="profile-username">
                                        <span className="op-7">Hi,</span>
                                        <span className="fw-bold">{userData?.fullName}</span>
                                    </span>
                                </a>
                                <ul className={toggle ? "dropdown-menu dropdown-user animated fadeIn ct_profile_drop12 show" : "dropdown-menu dropdown-user animated fadeIn ct_profile_drop12"}>
                                    <div className="dropdown-user-scroll scrollbar-outer">
                                        <li>
                                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => navigate(pageRoutes.myprofile)}>My Profile</a>
                                        </li>
                                        {/* <li>
                                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => navigate(pageRoutes.editProfile)}>Edit Profile</a>
                                        </li> */}
                                        <li>
                                            <a className="dropdown-item" href="javascript:void(0)" onClick={() => navigate(pageRoutes.changePassword)}>Change Password</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#ct_logout_modal"
                                            >Logout</a>
                                        </li>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <>
                <div className="modal fade ct_assets_modal" id="ct_logout_modal" tabindex="-1" aria-labelledby="ct_logout_modalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0 pt-0">
                                <button type="button" className="btn-close ct_cloose_btn" data-bs-dismiss="modal" aria-label="Close"><i className="fa-solid fa-xmark"></i></button>
                            </div>
                            <div className="modal-body border-0 ">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0117 0C4.51172 0 0.0117188 4.5 0.0117188 10C0.0117188 15.5 4.51172 20 10.0117 20C15.5117 20 20.0117 15.5 20.0117 10C20.0117 4.5 15.5117 0 10.0117 0ZM10.0117 15.9C6.81172 15.9 4.11172 13.3 4.11172 10C4.11172 8.3 4.91172 6.6 6.21172 5.5C6.61172 5.2 7.31172 5.2 7.61172 5.6C8.01172 6.1 7.91172 6.7 7.51172 7.1C6.61172 7.8 6.11172 8.9 6.11172 10.1C6.11172 12.2 7.81172 14 10.0117 14C12.2117 14 13.9117 12.3 13.9117 10.1C13.9117 9 13.4117 7.9 12.5117 7.1C12.1117 6.8 12.0117 6.1 12.4117 5.7C12.8117 5.3 13.4117 5.2 13.8117 5.6C15.1117 6.7 15.9117 8.4 15.9117 10.1C15.9117 13.3 13.2117 15.9 10.0117 15.9ZM10.0117 3.5C10.5117 3.5 11.0117 3.9 11.0117 4.5V8.2C11.0117 8.7 10.5117 9.2 10.0117 9.2C9.51172 9.2 9.01172 8.7 9.01172 8.2V4.5C9.01172 3.9 9.51172 3.5 10.0117 3.5Z" fill="#DC0202"></path>
                                </svg>
                                <h4 className="text-center mb-4 ct_fw_600">LogOut Account</h4>
                                <p className="text-center ct_grey_text">
                                    Are you sure, you want to logout? once you logout <br /> you need to login again?
              </p>
                                <div className="modal-footer border-0 justify-content-center">
                                    <button type="button" className="ct_custom_btn ct_dark_btn_clr ct_btn_radius ct_cancle_btn" data-bs-dismiss="modal" style={{ backgroundColor: "#eee" }}> Cancel</button>
                                    <button type="button" className="ct_custom_btn ct_dark_btn_clr ct_btn_radius bg-danger text-white ct_logout_text_modal " data-bs-dismiss="modal" style={{ borderColor: "rgb(220, 53, 69)" }} onClick={onHandleLogout}>Log Out</button>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default Header