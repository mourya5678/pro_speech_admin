import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { baseUrl, getModuleBySectionIdEndPointURL } from '../Routes/bakendRoutes';
import { pageRoutes } from '../Routes/pageRoutes';

const SectionDetails = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isLoader, setIsLoader] = useState(false);
    const [moduleData, setModuleData] = useState();
    console.log({ state });

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
    }

    return (
        <div className="wrapper ct_main_dashboard">
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
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-round">
                                        <div className="card-body">
                                            <div className="card-head-row card-tools-still-right mb-4">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
                                                    <h4 className="card-title ct_fw_700 mb-0">{state?.id?.section_name}</h4>
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
                                                        {moduleData?.map((item, i) => (
                                                            <tr>
                                                                <td>{i + 1}</td>
                                                                <td>
                                                                    <img src={item?.module_image != "" ? item?.module_image ?? "assets/img/user124.jpg" : "assets/img/user124.jpg"} className="ct_user_icon" />
                                                                </td>
                                                                <td>{item?.module_name} </td>
                                                                <td>{item?.lessons?.length} </td>
                                                                <td> <button className="ct_eye_btn" onClick={() => navigate(pageRoutes.edit_module, { state: { data: item } })}><i className="fa-solid fa-edit"></i></button></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
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
