import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaginationDropdown from '../Component/PaginationDropdown';
import ReactPagination from '../Component/reactPagination';
import Loader from '../Controllers/Loader';
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { baseUrl, getModuleBySectionIdEndPointURL, updateModulesDetailEndPointURL } from '../Routes/bakendRoutes';
import { pageRoutes } from '../Routes/pageRoutes';

const SectionDetails = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [usersPerPage, setUserPerPages] = useState(10);
    const [isToggle, setIsToggle] = useState(false);
    const [isToggle1, setIsToggle1] = useState(false);
    const { state } = useLocation();
    const [isLoader, setIsLoader] = useState(false);
    const [moduleData, setModuleData] = useState([]);
    console.log({ state });

    const displayUsers = moduleData?.slice(
        currentPage * usersPerPage,
        (currentPage + 1) * usersPerPage
    );

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    useEffect(() => {
        getDataById();
    }, []);

    const getDataById = async () => {
        setIsLoader(true);
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + getModuleBySectionIdEndPointURL + state?.id?._id}`, headers, false);
        console.log({ apiResponse })
        setModuleData(apiResponse?.data ?? [])
        setIsLoader(false);
    };

    const onDeleteModalById = async (val) => {
        setIsLoader(true);
        console.log(val);
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('delete', `${baseUrl + updateModulesDetailEndPointURL + val}`, headers, true);
        console.log({ apiResponse });
        setIsLoader(false);
        getDataById();
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
                                                    <h4 className="card-title ct_fw_700 mb-0">{state?.id?.section_name}</h4>
                                                    <button type="button" onClick={() => navigate(pageRoutes.add_module, { state: { data: state?.id?._id } })} className="ct_edit_btn ct_custom_btn w-auto py-2 h-auto"><i className="fa-solid fa-plus"></i> Add Module</button>
                                                </div>
                                            </div>
                                            <div className="table-responsive ct_custom_table">
                                                <table
                                                    className="display table table-striped table-hover"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>S No.</th>
                                                            <th>Module Image</th>
                                                            <th>Module Name</th>
                                                            <th>Lesson Number</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {displayUsers?.map((item, i) => (
                                                            <tr>
                                                                <td>{i + 1}</td>
                                                                <td>
                                                                    <img src={item?.module_image != "" ? item?.module_image ?? "assets/img/user124.jpg" : "assets/img/user124.jpg"} className="ct_user_icon" />
                                                                </td>
                                                                <td>{item?.module_name} </td>
                                                                <td>{item?.lessons?.length} </td>
                                                                <td>
                                                                    <button className="ct_eye_btn" onClick={() => navigate(pageRoutes.edit_module, { state: { data: item } })}><i className="fa-solid fa-edit"></i></button>
                                                                    <a href="javascript:void(0)"><button className="ct_delete_btn w-auto py-2 h-auto"
                                                                        onClick={() => onDeleteModalById(item?._id)}
                                                                    ><i className="fa-solid fa-trash"></i></button></a>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                {
                                                    moduleData?.length > 0 && <div className="d-flex align-items-center flex-wrap justify-content-between gap-3 mb-3">
                                                        <PaginationDropdown
                                                            onChange={(val) => {
                                                                setUserPerPages(val);
                                                                setCurrentPage(0);
                                                            }}
                                                        />
                                                        <ReactPagination
                                                            pageCount={Math.ceil(
                                                                moduleData.length / usersPerPage
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
        </div>
    )
}

export default SectionDetails
