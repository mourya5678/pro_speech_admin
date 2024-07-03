import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PaginationDropdown from '../Component/PaginationDropdown';
import ReactPagination from '../Component/reactPagination';
import Loader from '../Controllers/Loader';
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { baseUrl, getAllQuizByLessonIdEndPointURL } from '../Routes/bakendRoutes';
import { pageRoutes } from '../Routes/pageRoutes';

const QuizDetails = () => {
    const navigate = useNavigate();
    const [isToggle, setIsToggle] = useState(false);
    const [isToggle1, setIsToggle1] = useState(false);
    const { state } = useLocation();
    const [isLoader, setIsLoader] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage, setUserPerPages] = useState(10);
    const [allModules, setAllModules] = useState([])

    const displayUsers = allModules.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );
    console.log(state);

    useEffect(() => {
        getQuizById();
    }, []);

    const getQuizById = async () => {
        setIsLoader(true)
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + getAllQuizByLessonIdEndPointURL + state?.id}`, headers, false);
        setAllModules(apiResponse?.data?.[0]?.questions ?? []);
        setIsLoader(false)
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
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
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-round">
                                        <div className="card-body">
                                            <div className="card-head-row card-tools-still-right mb-4">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
                                                    <h4 className="card-title ct_fw_700 mb-0">{state?.lesson_name}</h4>
                                                </div>
                                            </div>
                                            <div className="table-responsive ct_custom_table">
                                                <table
                                                    className="display table table-striped table-hover"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>S No.</th>
                                                            <th>Questions</th>
                                                            <th>Option 1</th>
                                                            <th>Option 2</th>
                                                            <th>Option 3</th>
                                                            <th>Option 4</th>
                                                            <th>Answer</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {displayUsers ? displayUsers?.map((item, i) => (
                                                            <tr>
                                                                <td>{i + 1}</td>
                                                                <td>{item?.text}</td>
                                                                <td className="text-left">
                                                                    <span>{item?.options[0]}</span>
                                                                </td>
                                                                <td className="text-left">
                                                                    <span>{item?.options[1]}</span>
                                                                </td>
                                                                <td className="text-left">
                                                                    <span>{item?.options[2]}</span>
                                                                </td>
                                                                <td className="text-left">
                                                                    <span>{item?.options[3]}</span>
                                                                </td>
                                                                <td className="text-left">
                                                                    <span>{item?.correctOption}</span>
                                                                </td>
                                                            </tr>
                                                        ))
                                                            :
                                                            <tr>
                                                                <td>No data found</td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                                {
                                                    allModules?.length > 0 && <div className="d-flex align-items-center flex-wrap justify-content-between gap-3 mb-3">
                                                        <PaginationDropdown
                                                            onChange={(val) => {
                                                                setUserPerPages(val);
                                                                setCurrentPage(0);
                                                            }}
                                                        />
                                                        <ReactPagination
                                                            pageCount={Math.ceil(
                                                                allModules.length / usersPerPage
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
                    }
                </div>
                <Footer />
            </div>
        </div >
    )
}

export default QuizDetails
