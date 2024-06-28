import React from 'react';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';

const AddNewSection = () => {
    return (
        <div className="wrapper">
            <Sidebar />
            <div className="main-panel">
                <Header />
                <div className="container">
                    <div className="page-inner">
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <div className="card card-round">
                                    <div className="card-body">
                                        <div className="card-head-row card-tools-still-right mb-5">
                                            <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap w-100">
                                                <h4 className="card-title ct_fw_700 mb-0 text-center">Edit Profile</h4>
                                            </div>
                                        </div>
                                        <form className="pt-0">
                                            <div className="row">

                                            </div>
                                            <div className="pt-4">
                                                <button type="button" className="ct_custom_btn mx-auto d-block"> Submit</button>
                                            </div>
                                        </form>
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

export default AddNewSection
