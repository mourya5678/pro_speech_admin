import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PaginationDropdown from '../Component/PaginationDropdown';
import ReactPagination from '../Component/reactPagination';
import Loader from '../Controllers/Loader';
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { baseUrl, updateQuizByIdEndPointURL, getAllQuizByLessonIdEndPointURL } from '../Routes/bakendRoutes';
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
    const [lesson_id, setLessonId] = useState('');
    const [quizOptions, setQuizOptions] = useState([]);
    const [correctOptionValue, setCorrectOptionValue] = useState([]);

    const displayUsers = allModules?.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );

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
        setLessonId(apiResponse?.data?.[0]?._id ?? '');
        let obj = [];
        setIsLoader(false)
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const onHandleDeleteQuiz = async (val, id) => {
        console.log(val, id);
        setIsLoader(true)
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('delete', `${baseUrl + updateQuizByIdEndPointURL + id}/questions/${val?._id}`, headers, true);
        apiResponse?.success == true && getQuizById();
        setIsLoader(false)
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
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {displayUsers ? displayUsers?.map((item, i) => (
                                                            <tr>
                                                                <td>{i + 1}</td>
                                                                <td dangerouslySetInnerHTML={{ __html: (item?.text) }}></td>
                                                                <td className="text-left">
                                                                    {item?.options[0]?.slice(0, 4) == 'http' ?
                                                                        item?.options[0]?.endsWith('.mp3') ?
                                                                            <audio controls src={item?.options[0]} style={{ width: "250px", height: '50' }} />
                                                                            :
                                                                            item?.options[0]?.endsWith('.wav') ?
                                                                                <audio controls src={item?.options[0]} style={{ width: "250px", height: '50' }} />
                                                                                :
                                                                                item?.options[0]?.endsWith('.aif') ?
                                                                                    <audio controls src={item?.options[0]} style={{ width: "250px", height: '50' }} />
                                                                                    :
                                                                                    <img style={{ width: "150px", height: '100px' }} src={item?.options[0]}></img>
                                                                        :
                                                                        <span>{item?.options[0]}</span>
                                                                    }
                                                                </td>
                                                                <td className="text-left">
                                                                    {item?.options[1]?.slice(0, 4) == 'http' ?
                                                                        item?.options[1]?.endsWith('.mp3') ?
                                                                            <audio controls src={item?.options[1]} style={{ width: "250px", height: '50' }} />
                                                                            :
                                                                            item?.options[1]?.endsWith('.wav') ?
                                                                                <audio controls src={item?.options[1]} style={{ width: "250px", height: '50' }} />
                                                                                :
                                                                                item?.options[1]?.endsWith('.aif') ?
                                                                                    <audio controls src={item?.options[1]} style={{ width: "250px", height: '50' }} />
                                                                                    :
                                                                                    <img style={{ width: "150px", height: '100px' }} src={item?.options[1]}></img>
                                                                        :
                                                                        <span>{item?.options[1]}</span>
                                                                    }
                                                                </td>
                                                                <td className="text-left">
                                                                    {item?.options[2]?.slice(0, 4) == 'http' ?
                                                                        item?.options[2]?.endsWith('.mp3') ?
                                                                            <audio controls src={item?.options[2]} style={{ width: "250px", height: '50' }} />
                                                                            :
                                                                            item?.options[2]?.endsWith('.wav') ?
                                                                                <audio controls src={item?.options[2]} style={{ width: "250px", height: '50' }} />
                                                                                :
                                                                                item?.options[2]?.endsWith('.aif') ?
                                                                                    <audio controls src={item?.options[2]} style={{ width: "250px", height: '50' }} />
                                                                                    :
                                                                                    <img style={{ width: "150px", height: '100px' }} src={item?.options[2]}></img>
                                                                        :
                                                                        <span>{item?.options[2]}</span>
                                                                    }
                                                                </td>
                                                                <td className="text-left">
                                                                    {item?.options[3]?.slice(0, 4) == 'http' ?
                                                                        item?.options[3]?.endsWith('.mp3') ?
                                                                            <audio controls src={item?.options[3]} style={{ width: "250px", height: '50' }} />
                                                                            :
                                                                            item?.options[3]?.endsWith('.wav') ?
                                                                                <audio controls src={item?.options[3]} style={{ width: "250px", height: '50' }} />
                                                                                :
                                                                                item?.options[3]?.endsWith('.aif') ?
                                                                                    <audio controls src={item?.options[3]} style={{ width: "250px", height: '50' }} />
                                                                                    :
                                                                                    <img style={{ width: "150px", height: '100px' }} src={item?.options[3]}></img>
                                                                        :
                                                                        <span>{item?.options[3]}</span>
                                                                    }
                                                                </td>
                                                                <td className="text-left">
                                                                    <span>
                                                                        {item?.correctOption?.slice(0, 4) == 'http' ?
                                                                            item?.correctOption?.endsWith('.mp3') ?
                                                                                <audio controls src={item?.correctOption} style={{ width: "250px", height: '50' }} />
                                                                                :
                                                                                item?.correctOption?.endsWith('.wav') ?
                                                                                    <audio controls src={item?.correctOption} style={{ width: "250px", height: '50' }} />
                                                                                    :
                                                                                    item?.correctOption?.endsWith('.aif') ?
                                                                                        <audio controls src={item?.correctOption} style={{ width: "250px", height: '50' }} />
                                                                                        :
                                                                                        <img style={{ width: "150px", height: '100px' }} src={item?.correctOption}></img>
                                                                            :
                                                                            <span>{item?.correctOption}</span>
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <a href="javascript:void(0)">
                                                                        <button
                                                                            onClick={() => navigate(pageRoutes.edit_quiz, { state: { data: item, lesson_id: lesson_id } })}
                                                                            className="ct_edit_btn w-auto py-2 h-auto"
                                                                        ><i className="fa-solid fa-edit" />
                                                                        </button>
                                                                    </a>
                                                                    <a href="javascript:void(0)">
                                                                        <button
                                                                            className="ct_delete_btn w-auto py-2 h-auto"
                                                                            onClick={() => onHandleDeleteQuiz(item, lesson_id)}
                                                                        ><i className="fa-solid fa-trash" />
                                                                        </button>
                                                                    </a>
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
                                            </div>
                                            <div className="mt-3">
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
                                                            currentPage={currentPage}
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