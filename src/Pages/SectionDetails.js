import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { baseUrl } from '../Routes/bakendRoutes';

const SectionDetails = () => {
    const { state } = useLocation();
    console.log(state);

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
                                                <h4 className="card-title ct_fw_700 mb-0">{state?.id?.section_name}</h4>
                                            </div>
                                        </div>
                                        <div className="table-responsive ct_custom_table">
                                            <table
                                                className="display table table-striped table-hover"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Module Image</th>
                                                        <th>Module Name</th>
                                                        <th>Lesson Number</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {state?.id?.modules?.map((item) => (
                                                        <tr>
                                                            <td>1</td>
                                                            <td>
                                                                <img src={`http://192.168.29.104:4005/${item?.module_image}`} className="ct_user_icon" />
                                                            </td>
                                                            <td>{item?.module_name} </td>
                                                            <td>{item?.lessons?.length} </td>
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
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default SectionDetails
