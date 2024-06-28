import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pipApiResponse, pipGetToken, pipSaveUserData } from '../Controllers/Pip';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { baseUrl, updateSectionDetailsEndPointURL } from '../Routes/bakendRoutes';

const EditSection = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [isLoader, setIsLoader] = useState(false);
    const [sectionImage, setSectionImage] = useState(state?.id?.section_image ?? '');
    const [sectionName, setSectionName] = useState(state?.id?.section_name ?? '');
    const [changeImage, setChangeImage] = useState();
    const [errorMessage, setErrorMessage] = useState({
        sectionNameError: '',
        sectionImageError: ''
    })
    console.log(state?.id);

    const handleDocumentsChange = (e) => {
        setChangeImage(e.target.files[0]);
    }

    const onHandleSubmitDetails = async () => {
        if (sectionImage || changeImage && sectionName) {
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
            if (changeImage) {
                formData.append("section_image", changeImage);
            }
            var apiResponse = await pipApiResponse('put', `${baseUrl + updateSectionDetailsEndPointURL + state?.id?._id}`, headers, true, formData);
            setIsLoader(false);
            apiResponse?.success == true && navigate(-1);
        } else {
            setErrorMessage({
                ...errorMessage,
                sectionNameError: sectionName ? '' : "Please enter section name",
                sectionImageError: sectionImage || changeImage ? '' : "Please select section image"
            })
        }
    }

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
                                                <h4 className="card-title ct_fw_700 mb-0 text-center">Edit Section</h4>
                                            </div>
                                        </div>
                                        <form className="pt-0">
                                            <div className="row">
                                                <div className="ct_proile_img ct_edit_profile_img text-center mx-auto mb-4">
                                                    <label for="ct_profile_edit">
                                                        {/* src={profileImageChange ? URL.createObjectURL(profileImageChange) : profileImage ? profileImage : 'assets/img/user124.jpg'} */}
                                                        <img src={changeImage ? URL.createObjectURL(changeImage) : sectionImage ?? "assets/img/user124.jpg"} alt="" />
                                                        <input
                                                            className='form-control d-none'
                                                            type="file" id="ct_profile_edit"
                                                            multiple
                                                            onChange={handleDocumentsChange}
                                                            accept="image/*,application/pdf"
                                                        />
                                                        <i className="fa-solid fa-camera" style={{ top: "44%" }}></i>
                                                    </label>
                                                    {errorMessage?.sectionImageError !== "" &&
                                                        <span style={{ color: "red" }}>
                                                            {errorMessage?.sectionImageError}
                                                        </span>
                                                    }
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 mx-auto">
                                                        <div className="form-group mb-4">
                                                            <label className="ct_fw_600 mb-2">Section Name</label>
                                                            <input
                                                                value={sectionName}
                                                                type="text"
                                                                placeholder="Enter section name"
                                                                onChange={(e) => setSectionName(e.target.value)}
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

export default EditSection
