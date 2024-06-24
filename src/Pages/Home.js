import React, { useEffect, useState } from 'react'
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { baseUrl, } from '../Routes/bakendRoutes';

const Home = () => {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        // getApiData();
    }, []);

    const getApiData = async () => {
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authentication': `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', 'getApiEndPointURL', headers, false);
    }


    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
                <Header />
                <div className="container">
                    <div className="page-inner">
                        <div
                            className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4"
                        >
                            <div>
                                <h3 className="fw-bold mb-3">Dashboard</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-md-3 mb-4">
                                <div className="card card-stats card-round">
                                    <div className="card-body">
                                        <p className="mb-1">0% Completed</p>
                                        <div className="progress ct_progress">
                                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <img src="assets/img/file.png" alt="" />
                                        <h4 className="mb-0 ct_fw_600 text-center">International Phonetic Alphabet
                    </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3 mb-4">
                                <div className="card card-stats card-round">
                                    <div className="card-body">
                                        <p className="mb-1">30% Completed</p>
                                        <div className="progress ct_progress">
                                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <img src="assets/img/file.png" alt="" />
                                        <h4 className="mb-0 ct_fw_600 text-center">Connected Speech
                    </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3 mb-4">
                                <div className="card card-stats card-round">
                                    <div className="card-body">
                                        <p className="mb-1">0% Completed</p>
                                        <div className="progress ct_progress">
                                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <img src="assets/img/file.png" alt="" />
                                        <h4 className="mb-0 ct_fw_600 text-center">Rhythm
                    </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-md-3 mb-4">
                                <div className="card card-stats card-round">
                                    <div className="card-body">
                                        <p className="mb-1">0% Completed</p>
                                        <div className="progress ct_progress">
                                            <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <img src="assets/img/file.png" alt="" />
                                        <h4 className="mb-0 ct_fw_600 text-center">Syllable Types
                    </h4>
                                    </div>
                                </div>
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
                                                    <tr>
                                                        <td>John Doe</td>
                                                        <td>johndoe@gmail.com</td>
                                                        <td>9874563210</td>
                                                        <td>Male</td>
                                                        <td>20/004/1999</td>
                                                        <td>
                                                            <button className="ct_delete_btn"><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>John Doe</td>
                                                        <td>johndoe@gmail.com</td>
                                                        <td>9874563210</td>
                                                        <td>Male</td>
                                                        <td>20/004/1999</td>
                                                        <td>
                                                            <button className="ct_delete_btn"><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>John Doe</td>
                                                        <td>johndoe@gmail.com</td>
                                                        <td>9874563210</td>
                                                        <td>Male</td>
                                                        <td>20/004/1999</td>
                                                        <td>
                                                            <button className="ct_delete_btn"><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>John Doe</td>
                                                        <td>johndoe@gmail.com</td>
                                                        <td>9874563210</td>
                                                        <td>Male</td>
                                                        <td>20/004/1999</td>
                                                        <td>
                                                            <button className="ct_delete_btn"><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>John Doe</td>
                                                        <td>johndoe@gmail.com</td>
                                                        <td>9874563210</td>
                                                        <td>Male</td>
                                                        <td>20/004/1999</td>
                                                        <td>
                                                            <button className="ct_delete_btn"><i className="fa-solid fa-trash"></i></button>
                                                        </td>
                                                    </tr>
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

export default Home