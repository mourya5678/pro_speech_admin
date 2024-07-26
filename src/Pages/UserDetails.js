import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PaginationDropdown from '../Component/PaginationDropdown';
import ReactPagination from '../Component/reactPagination';
import { pipApiResponse, pipDateFormate, pipGetToken } from '../Controllers/Pip';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { SlideshowLightbox } from "lightbox.js-react";
import { baseUrl, getUserDetailsEndPointURL } from '../Routes/bakendRoutes';
import Loader from '../Controllers/Loader';

const UserDetails = () => {
    const { state } = useLocation();
    const [isToggle, setIsToggle] = useState(false);
    const [isToggle1, setIsToggle1] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage, setUserPerPages] = useState(10);
    const [usersDetails, setUsersDetails] = useState([]);
    const [scoreData, setScoreData] = useState();
    const [userName, setUserName] = useState();
    const [userImage, setUserImage] = useState();

    const displayUsers = usersDetails?.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );

    useEffect(() => {
        getUserDetails();
    }, []);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const getUserDetails = async () => {
        setIsLoader(true);
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', baseUrl + getUserDetailsEndPointURL + state?.id, headers, false);
        setIsLoader(false);
        console.log(apiResponse);
        setUsersDetails(apiResponse?.sectionsWithCompletion ?? []);
        setScoreData(apiResponse?.scoreData ?? {});
        setUserName(apiResponse?.userData?.profile)
        setUserImage(apiResponse?.userData?.profile?.profileImage)
    };

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
                            <div
                                className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4"
                            >
                                <div>
                                    <h3 className="fw-bold mb-3">{userName?.fullName ?? ''}</h3>
                                    <div className="d-flex align-items-center">
                                        <div style={{ marginRight: "10px" }}>
                                            <img className="ct_user_icon12" data-bs-toggle="modal" data-bs-target="#ct_user_profile_img" src={userImage != '' ? userImage ?? "assets/img/user124.jpg" : "assets/img/user124.jpg"} />
                                        </div>
                                        <div>
                                            <p className="mb-0">{userName?.email ?? ''}</p>
                                            <p className="mb-0">{pipDateFormate(userName?.dateOfBirth) ?? ''}</p>
                                            <p className="mb-0">{userName?.phone ?? ''}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {usersDetails && usersDetails?.map((item) => (
                                    <div className="col-sm-6 col-md-3 mb-4">
                                        <div className="card card-stats card-round">
                                            <div className="card-body">
                                                <p className="mb-1">{item?.completionPercentage}% Completed</p>
                                                <div className="progress ct_progress">
                                                    <div style={{ width: `${item?.completionPercentage}px` }} className="progress-bar" role="progressbar"  ></div>
                                                </div>
                                                <img src="assets/img/file.png" alt="" />
                                                <h4 className="mb-0 ct_fw_600 text-center">{item?.section_name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-12 mb-md-0">
                                    <div className="ct_score_card_bg123">
                                        <div className="d-flex align-items-center gap-4 flex-wrap justify-content-center">
                                            <div className="ct_score_card_circle">
                                                <p className="mb-0">Your Score</p>
                                                <h4 className="mb-0 ct_fw_600">{scoreData?.percentage}</h4>
                                            </div>
                                            <h5>{scoreData?.smsMessage}</h5>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row mt-4">
                                <div className="col-md-12 mb-4 mb-md-0">
                                    <div className="ct_score_card_bg123">
                                        <h4 className="ct_fw_600 mb-4">Your score card</h4>
                                        <div className="ct_score_list_scroll">
                                            {scoreData?.scoreData?.length != 0 ? scoreData?.scoreData?.map((item, i) => (
                                                < div className="ct_scror_list_car mb-2">
                                                    <p className="mb-0">{i + 1}</p>
                                                    <p className="mb-0">{item?.lesson_name}</p>
                                                    <p className="mb-0">{item?.score_number}/{item?.total_question}</p>
                                                </div>
                                            ))
                                                :
                                                "You haven't attended any lessons yet."
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row mt-5">
                                <div className="col-md-12">
                                    <div className="card card-round">
                                        <div className="card-body">
                                            <div className="card-head-row card-tools-still-right mb-4">
                                                <div className="card-title ct_fw_700">Your Score Card</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div class="modal fade" id="ct_user_profile_img" tabindex="-1" aria-labelledby="ct_user_profile_imgLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header border-0">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="ct_modal_img_view text-center">
                                                <img style={{ width: "200px", height: "200px", objectFit: "cover" }} src={userImage != '' ? userImage ?? "assets/img/user124.jpg" : "assets/img/user124.jpg"} />
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
        </div >
    )
}

export default UserDetails