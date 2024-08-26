import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { baseUrl, getLessaonByIdEndPointURL, updateLessonEndPointURL, getImageURLEndPointURL } from '../Routes/bakendRoutes';
import { pageRoutes } from '../Routes/pageRoutes';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { Editor } from '@tinymce/tinymce-react';
import Loader from '../Controllers/Loader';
import { message } from 'antd';


const AddLessonDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [editorValue, setEditorValue] = useState();
    const [name, setName] = useState();
    const [isLoader, setIsLoader] = useState(false);
    const editorRef = useRef(null);
    const [errorMessage, setErroMessage] = useState({
        nameError: '',
        editerError: ''
    });
    const [isToggle, setIsToggle] = useState(false);
    const [isToggle1, setIsToggle1] = useState(false);
    const [profileImageChange, setProfileImageChange] = useState([]);

    useEffect(() => {
        getLessonByID();
    }, []);

    const getLessonByID = async () => {
        setIsLoader(true);
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + getLessaonByIdEndPointURL + state?.item}`, headers, false);
        setName(apiResponse?.data?.lesson_name)
        setEditorValue(apiResponse?.data?.lessonDetails)
        setIsLoader(false);
    }

    const onHandleAddLessonDetail = async () => {
        let data = editorRef.current.getContent();
        setEditorValue(data);
        if (name && data) {
            setIsLoader(true);
            setErroMessage({
                ...errorMessage,
                nameError: '',
                editerError: ''
            })
            const dataas = {
                lesson_name: name,
                lessonDetails: data
            }
            const token = pipGetToken();
            const headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                Authorization: `Bearer ${token}`
            }
            var apiResponse = await pipApiResponse('put', `${baseUrl + updateLessonEndPointURL + state?.item}`, headers, true, dataas);
            setIsLoader(false);
            // console.log({ apiResponse }, { dataas })
            apiResponse?.success == true && navigate(-1);
        } else {
            setErroMessage({
                ...errorMessage,
                nameError: name ? '' : 'Please enter lesson name',
                editerError: editorValue ? '' : 'Please enter lesson detail'
            })
        }
    };

    const handleDocumentsChange = (e) => {
        setProfileImageChange(e.target.files);
    };

    const onHandleGetDocumentUrl = async () => {
        if (profileImageChange?.length != 0) {
            setIsLoader(true);
            const token = pipGetToken();
            const headers = {
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json',
                Authorization: `Bearer ${token}`
            }
            const formData = new FormData()
            formData.append('file_name', 'file_name');
            for (let i = 0; i < profileImageChange.length; i++) {
                console.log(profileImageChange[i])
                formData.append("file", profileImageChange[i]);
            }
            var apiResponse = await pipApiResponse('post', `${baseUrl + getImageURLEndPointURL}`, headers, true, formData);
            setIsLoader(false);
            console.log({ apiResponse })
        } else {
            message.error("Please select the Image")
        }
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
                                <div className="col-md-10 mx-auto">
                                    <div className="card card-round">
                                        <div className="card-body pt-5">
                                            <div className="card-head-row card-tools-still-right mb-5">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
                                                    <a href="javascript:void(0)" onClick={() => navigate(-1)} className="ct_back_btn">
                                                        <i className="fa-solid fa-arrow-left-long"></i>
                                                    </a>
                                                    <h4 className="card-title ct_fw_700 mb-0 mx-auto">Edit Lesson Detail</h4>
                                                </div>
                                            </div>
                                            <form className="pt-0">
                                                <div className="row" id="ct_append_quiz">
                                                    <div className="col-md-12 ">
                                                        <div className="form-group p-0 mb-4 ct_custom_input">
                                                            <label className="ct_fw_600 mb-2">Lesson Name</label>
                                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="floatingInput" placeholder="Enter Lesson Name" />
                                                            {errorMessage?.nameError != '' &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.nameError}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 ">
                                                        <div className="form-group p-0 mb-4 ct_custom_input">
                                                            <label className="ct_fw_600 mb-2">Lesson Detail</label>
                                                            <div id="">
                                                                <Editor
                                                                    apiKey='utc9w7lm5ym3sm21k8qj60va6g446pxihgy2olr03e2pvx0l'
                                                                    onInit={(evt, editor) => (editorRef.current = editor)}
                                                                    init={{
                                                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                                        tinycomments_mode: 'embedded',
                                                                        tinycomments_author: 'Author name',
                                                                        mergetags_list: [
                                                                            { value: 'First.Name', title: 'First Name' },
                                                                            { value: 'Email', title: 'Email' },
                                                                        ],
                                                                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                                                    }}
                                                                    initialValue={editorValue}
                                                                />
                                                            </div>
                                                            {errorMessage?.editerError != '' &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.editerError}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-4">
                                                    <button type="button" className="ct_custom_btn mx-auto d-block " onClick={onHandleAddLessonDetail}> Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                        {/* <div className="card-body pt-5">
                                            <div className="card-head-row card-tools-still-right mb-5">
                                                <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
                                                    <h4 className="card-title ct_fw_700 mb-0 mx-auto">Get document url</h4>
                                                </div>
                                            </div>
                                            <form className="pt-0">
                                                <div className="row" id="ct_append_quiz">
                                                    <div className="ct_proile_img ct_edit_profile_img text-center mx-auto mb-5">
                                                        <label for="ct_profile_edit">
                                                            <input
                                                                className='form-control'
                                                                type="file" id="ct_profile_edit"
                                                                onChange={handleDocumentsChange}
                                                                multiple
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="pt-4">
                                                    <button type="button" className="ct_custom_btn mx-auto d-block " onClick={onHandleGetDocumentUrl}> Submit</button>
                                                </div>
                                            </form>
                                        </div> */}
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

export default AddLessonDetail