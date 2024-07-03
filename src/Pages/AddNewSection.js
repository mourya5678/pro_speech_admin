import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { pipApiResponse, pipGetToken } from '../Controllers/Pip'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import { addSectionEndPointURL, baseUrl } from '../Routes/bakendRoutes'

const AddNewSection = () => {
    const navigate = useNavigate();
    const [isToggle, setIsToggle] = useState(false);
    const [isToggle1, setIsToggle1] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [sectionImage, setSectionImage] = useState();
    const [sectionName, setSectionName] = useState();
    const [errorMessage, setErrorMessage] = useState({
        sectionNameError: '',
        sectionImageError: ''
    });

    const onHandleSubmitDetails = async () => {
        if (sectionImage && sectionName) {
            setErrorMessage({
                ...errorMessage,
                sectionNameError: '',
                sectionImageError: ''
            })
            setIsLoader(true);
            const token = pipGetToken();
            const headers = {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
                Authorization: `Bearer ${token}`
            }
            const formData = new FormData();
            formData.append("section_name", sectionName);
            formData.append("section_image", sectionImage);
            var apiResponse = await pipApiResponse('put', `${baseUrl + addSectionEndPointURL}`, headers, true, formData);
            setIsLoader(false);
            apiResponse?.success == true && navigate(-1);
        } else {
            setErrorMessage({
                ...errorMessage,
                sectionNameError: sectionName ? '' : "Please enter section name",
                sectionImageError: sectionImage ? '' : "Please select section image"
            })
        }
    };

    const handleDocumentsChange = (e) => {
        // setSectionImage(e.target.files[0]);
        console.log(e.target.files)
    };

    const onHandleChangeName = (e) => {
        if (e.target.value != "") {
            setSectionName(e.target.value)
            setErrorMessage({
                ...errorMessage,
                sectionNameError: "",
            })
        } else {
            setSectionName(e.target.value)
            setErrorMessage({
                ...errorMessage,
                sectionNameError: "Please enter section name",
            })
        }
    }

    return (
        <div className={`wrapper ct_main_dashboard ${isToggle ? "nav_open" : ""} ${isToggle1 ? "topbar_open" : ""}`}>
            <Sidebar />
            <div className="main-panel">
                <Header onClick={() => setIsToggle(!isToggle)} onPress={() => setIsToggle1(!isToggle1)} />
                <div className="container">
                    <div className="page-inner">
                        <div className="row">
                            <div className="col-md-10 mx-auto">
                                <div className="card card-round">
                                    <div className="card-body">
                                        <div className="card-head-row card-tools-still-right mb-5">
                                            <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap w-100">
                                                <h4 className="card-title ct_fw_700 mb-0 text-center">Add Section</h4>
                                            </div>
                                        </div>
                                        <form className="pt-0">
                                            <div className="row">
                                                <div className="ct_proile_img ct_edit_profile_img text-center mx-auto mb-4">
                                                    <label for="ct_profile_edit">
                                                        <img src={sectionImage != '' ? sectionImage ? URL.createObjectURL(sectionImage) : "assets/img/user124.jpg" : "assets/img/user124.jpg"} alt="" />
                                                        <input
                                                            className='form-control d-none'
                                                            type="file" id="ct_profile_edit"
                                                            // multiple
                                                            onChange={handleDocumentsChange}
                                                            accept="image/*,application/pdf"
                                                        />
                                                        <i className="fa-solid fa-camera" style={{ top: "44%" }}></i>
                                                    </label>
                                                </div>
                                                {errorMessage?.sectionImageError !== "" &&
                                                    <span className="ct_proile_img text-center mx-auto" style={{ color: "red" }}>
                                                        {errorMessage?.sectionImageError}
                                                    </span>
                                                }
                                                <div className="row">
                                                    <div className="col-md-12 mx-auto">
                                                        <div className="form-group mb-4">
                                                            <label className="ct_fw_600 mb-2">Section Name</label>
                                                            <input
                                                                value={sectionName}
                                                                type="text"
                                                                placeholder="Enter section name"
                                                                onChange={(e) => onHandleChangeName(e)}
                                                                className="form-control"
                                                            />
                                                            {errorMessage?.sectionNameError !== "" &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.sectionNameError}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-4">
                                                <button type="button" onClick={onHandleSubmitDetails} className="ct_custom_btn mx-auto d-block"> Submit</button>
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