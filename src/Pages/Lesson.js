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

const Lesson = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [allLessons, setAllLessons] = useState([]);

    console.log({ state }, "state", state?.data?._id);

    useEffect(() => {
        getSideBarValue();
    }, [state?.data?._id]);

    const getSideBarValue = async () => {
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + getLessonByIdEndpointURL + state?.data?._id}`, headers, false);
        console.log(apiResponse);
        setAllLessons(apiResponse?.data ?? []);
    }

    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage, setUserPerPages] = useState(25);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayUsers = allLessons.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );
    // const onHandleDeleteLesson = async (id) => {
    //     console.log(id, "kjljbklljkjkhjkhkj")
    //     const token = pipGetToken();
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'accept': 'application/json',
    //         Authorization: `Bearer ${token}`
    //     }
    //     var apiResponse = await pipApiResponse('delete', `${baseUrl + deleteLessonById + id}`, headers, true);
    //     console.log(apiResponse);
    //     getSideBarValue();
    // }

    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
                <Header />
                <div className="container">
                    <div className="page-inner">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-round">
                                    <div className="card-body">
                                        <div className="card-head-row card-tools-still-right mb-4">
                                            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
                                                <h4 className="card-title ct_fw_700 mb-0">All Lessons</h4>
                                            </div>
                                        </div>
                                        <div className="table-responsive ct_custom_table">
                                            <table
                                                // id="example"
                                                className="display table table-striped table-hover"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Lesson Name</th>
                                                        <th>Question Number</th>
                                                        <th className="text-end">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {displayUsers && displayUsers?.map((item, i) => (
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{item?.lesson_name}</td>
                                                            <td className="text-left">
                                                                <span>{item?.question_count}</span>
                                                            </td>
                                                            <td className="text-end">
                                                                <a href="javascript:void(0)"> <button className="ct_edit_btn ct_custom_btn w-auto py-2 h-auto" onClick={() => navigate(pageRoutes.add_quiz, { state: { value: state } })}><i className="fa-solid fa-plus me-2"></i> Add Quiz</button></a>
                                                                <a href="add-lesson.detail.html"><button className="ct_edit_btn ct_custom_btn w-auto py-2 h-auto"  ><i className="fa-solid fa-plus me-2"></i>Add Lession Detail</button></a>
                                                                {/* <button className="ct_delete_btn" onClick={() => onHandleDeleteLesson(item?._id)}><i className="fa-solid fa-trash"></i></button> */}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {
                                                allLessons?.length > 0 && <div className="d-flex align-items-center flex-wrap justify-content-between gap-3 mb-3">
                                                    <PaginationDropdown
                                                        onChange={(val) => {
                                                            setUserPerPages(val);
                                                            setCurrentPage(0);
                                                        }}
                                                    />
                                                    <ReactPagination
                                                        pageCount={Math.ceil(
                                                            allLessons.length / usersPerPage
                                                        )}
                                                        onPageChange={handlePageClick}
                                                    />
                                                </div>
                                            }
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

export default Lesson
