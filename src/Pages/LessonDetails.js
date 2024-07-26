import React, { useEffect, useState } from 'react';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';
import { baseUrl, deleteLessonById, getLessonByIdEndpointURL } from '../Routes/bakendRoutes';
import { pageRoutes } from '../Routes/pageRoutes';
import PaginationDropdown from '../Component/PaginationDropdown';
import ReactPagination from '../Component/reactPagination';

const LessonDetails = () => {
    const { state } = useLocation();
    const [isToggle, setIsToggle] = useState(false);
    const navigate = useNavigate();
    const [isLoader, setIsLoader] = useState(false);
    const [isToggle1, setIsToggle1] = useState(false);

    useEffect(() => {
        console.log({ state })
    }, [state?.data?._id]);


    return (
        <div className={`wrapper ct_main_dashboard ${isToggle ? "nav_open" : ""} ${isToggle1 ? "topbar_open" : ""}`}>
            <Sidebar />
            <div className="main-panel">
                <Header onClick={() => setIsToggle(!isToggle)} onPress={() => setIsToggle1(!isToggle1)} />
                <div className="container">
                    {isLoader == true ?
                        <div class="ct_loader_main">
                            <div class="loader"></div>
                        </div>
                        :
                        <div className="page-inner">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-round">
                                        <div className="card-body">
                                            <div className="card-head-row card-tools-still-right mb-4">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
                                                    <h4 className="card-title ct_fw_700 mb-0">{state?.data?.lesson_name}</h4>
                                                    <button type="button" onClick={() => navigate(pageRoutes.addLessonDetail, { state: { item: state?.id } })} className="card-title1234 ct_custom_btn"><i className="fa-solid fa-edit mr-4"></i> Edit</button>
                                                </div>
                                            </div>
                                            <div className="table-responsive ct_custom_table" style={{ border: '2px solid #eee', padding: "15px", borderRadius: '10px' }}>
                                                <div dangerouslySetInnerHTML={{ __html: (state?.data?.lessonDetails) }} >
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

export default LessonDetails
