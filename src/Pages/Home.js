import React, { useEffect, useState } from 'react'
import { pipApiResponse, pipDateFormate, pipGetToken } from '../Controllers/Pip';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { baseUrl, deleteUserDataEndPointURL, getAllUserDataEndPointURL, } from '../Routes/bakendRoutes';
import PaginationDropdown from '../Component/PaginationDropdown';
import ReactPagination from '../Component/reactPagination';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../Routes/pageRoutes';

const Home = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage, setUserPerPages] = useState(25);
    const [isLoader, setIsLoader] = useState(false);

    const displayUsers = apiData.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );

    useEffect(() => {
        getApiData();
    }, []);

    const getApiData = async () => {
        setIsLoader(true);
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', baseUrl + getAllUserDataEndPointURL, headers, false);
        setApiData(apiResponse?.data ?? []);
        setIsLoader(false)
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const onHandleDeleteUsers = async (id) => {
        console.log({ id })
        setIsLoader(true);
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('delete', baseUrl + deleteUserDataEndPointURL + id, headers, true);
        setIsLoader(false)
        apiResponse.success == true && getApiData()
    };

    const onHandleEditUsers = async (id) => {
        navigate(pageRoutes.edit_user_profile, { state: { id: id } });
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
                                    <h3 className="fw-bold mb-3">Dashboard</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-round">
                                        <div className="card-body">
                                            <div className="card-head-row card-tools-still-right mb-4">
                                                <div className="card-title ct_fw_700">All Users</div>
                                            </div>
                                            <div className="table-responsive ct_custom_table">
                                                <table
                                                    id="example"
                                                    className="display table table-striped table-hover"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Number</th>
                                                            <th>Gender</th>
                                                            <th>DOb</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            displayUsers && displayUsers?.map((item) => (
                                                                <tr>
                                                                    <td>{item?.profile?.fullName}</td>
                                                                    <td>{item?.profile?.email}</td>
                                                                    <td>{item?.profile?.phone}</td>
                                                                    <td>{item?.profile?.gender}</td>
                                                                    <td>{pipDateFormate(item?.profile?.dateOfBirth)}</td>
                                                                    <td>
                                                                        <button className="ct_eye_btn" onClick={() => navigate(pageRoutes.user_details, { state: { id: item?._id } })}><i className="fa-solid fa-eye"></i></button>
                                                                        <button className="ct_eye_btn" onClick={() => onHandleEditUsers(item?._id)}><i className="fa-solid fa-edit"></i></button>
                                                                        <button className="ct_delete_btn" onClick={() => onHandleDeleteUsers(item?._id)}><i className="fa-solid fa-trash"></i></button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                                {
                                                    apiData?.length > 0 && <div className="d-flex align-items-center flex-wrap justify-content-between gap-3 mb-3">
                                                        <PaginationDropdown
                                                            onChange={(val) => {
                                                                setUserPerPages(val);
                                                                setCurrentPage(0);
                                                            }}
                                                        />
                                                        <ReactPagination
                                                            pageCount={Math.ceil(
                                                                apiData.length / usersPerPage
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
        </div>
    )
}

export default Home