import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PaginationDropdown from '../Component/PaginationDropdown';
import ReactPagination from '../Component/reactPagination';
import { pipApiResponse, pipDateFormate, pipGetToken } from '../Controllers/Pip';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { baseUrl, getUserDetailsEndPointURL } from '../Routes/bakendRoutes';

const UserDetails = () => {
    const { state } = useLocation();
    const [isLoader, setIsLoader] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage, setUserPerPages] = useState(25);
    const [usersDetails, setUsersDetails] = useState([]);

    const displayUsers = usersDetails.slice(
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
    };

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
                <Header />
                <div className="container">
                    {isLoader == true ?
                        <div className="ct_loader_main">
                            <div className="loader"></div>
                        </div>
                        :
                        <div className="page-inner">
                            <div
                                className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4"
                            >
                                <div>
                                    <h3 className="fw-bold mb-3">User Details</h3>
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
                                                <h4 className="mb-0 ct_fw_600">85%</h4>
                                            </div>
                                            <div>
                                                <h5>Yey! You are doing better</h5>
                                                <div className="d-flex align-items-center gap-2">
                                                    <i class="fa-solid fa-star ct_reviewed_star"></i>
                                                    <i class="fa-solid fa-star ct_reviewed_star"></i>
                                                    <i class="fa-solid fa-star ct_reviewed_star"></i>
                                                    <i class="fa-solid fa-star ct_reviewed_star"></i>
                                                    <i class="fa-solid fa-star ct_unreview_star"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row mt-4">
                                <div className="col-md-12 mb-4 mb-md-0">
                                    <div className="ct_score_card_bg123">
                                        <h4 className="ct_fw_600 mb-4">Your score card</h4>
                                        <div className="ct_score_list_scroll">
                                            <div className="ct_scror_list_car">
                                                <p className="mb-0">1</p>
                                                <div className="ct_play_btn">
                                                    <i class="fa-solid fa-play"></i>
                                                </div>
                                                <p className="mb-0">Consonants part 2 (fricatives)</p>
                                                <p className="mb-0">8/10</p>
                                            </div>
                                            <div className="ct_scror_list_car mt-2">
                                                <p className="mb-0">1</p>
                                                <div className="ct_play_btn">
                                                    <i class="fa-solid fa-play"></i>
                                                </div>
                                                <p className="mb-0">Consonants part 2 (fricatives)</p>
                                                <p className="mb-0">8/10</p>
                                            </div>
                                            <div className="ct_scror_list_car mt-2">
                                                <p className="mb-0">1</p>
                                                <div className="ct_play_btn">
                                                    <i class="fa-solid fa-play"></i>
                                                </div>
                                                <p className="mb-0">Consonants part 2 (fricatives)</p>
                                                <p className="mb-0">8/10</p>
                                            </div>
                                            <div className="ct_scror_list_car mt-2">
                                                <p className="mb-0">1</p>
                                                <div className="ct_play_btn">
                                                    <i class="fa-solid fa-play"></i>
                                                </div>
                                                <p className="mb-0">Consonants part 2 (fricatives)</p>
                                                <p className="mb-0">8/10</p>
                                            </div>
                                            <div className="ct_scror_list_car mt-2">
                                                <p className="mb-0">1</p>
                                                <div className="ct_play_btn">
                                                    <i class="fa-solid fa-play"></i>
                                                </div>
                                                <p className="mb-0">Consonants part 2 (fricatives)</p>
                                                <p className="mb-0">8/10</p>
                                            </div>

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
                        </div>

                    }
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default UserDetails
