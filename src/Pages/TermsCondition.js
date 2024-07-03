import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { Editor } from '@tinymce/tinymce-react';
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';
import { baseUrl, createTearmConditionEndPointURL, getTermsAndConditionEndPointURL } from '../Routes/bakendRoutes';
import Loader from '../Controllers/Loader';

const TermsCondition = () => {
    const [isLoader, setIsLoader] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const [isToggle1, setIsToggle1] = useState(false);
    const navigate = useNavigate();
    const [errorMessage, setErroMessage] = useState({
        editorValueError: ''
    });
    const [editorValue, setEditorValue] = useState();
    const editorRef = useRef(null);

    useEffect(() => {
        getDataOfTermsCondition();
    }, []);

    const getDataOfTermsCondition = async () => {
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + getTermsAndConditionEndPointURL}`, headers, false);
        setIsLoader(false);
        setEditorValue(apiResponse?.data?.html);
    };

    const onHandleAddPrivacyPolicy = async () => {
        let data = editorRef.current.getContent();
        setEditorValue(data);
        if (data) {
            setIsLoader(true);
            setErroMessage({
                ...errorMessage,
                editorValueError: ''
            })
            const dataas = {
                html: data
            }
            const token = pipGetToken();
            const headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                Authorization: `Bearer ${token}`
            }
            var apiResponse = await pipApiResponse('put', `${baseUrl + createTearmConditionEndPointURL}`, headers, true, dataas);
            setIsLoader(false);
            console.log({ apiResponse }, { dataas })
            apiResponse?.success == true && navigate(-1);
        } else {
            setErroMessage({
                ...errorMessage,
                editorValueError: data ? '' : 'Please enter the content'
            })
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
                                                    <h4 className="card-title ct_fw_700 mb-0 mx-auto">Add Terms and Conditions</h4>
                                                </div>
                                            </div>
                                            <form className="pt-0">
                                                <div className="row" id="ct_append_quiz">
                                                    <div className="col-md-12 ">
                                                        <div className="form-group p-0 mb-4 ct_custom_input">
                                                            <label className="ct_fw_600 mb-2">Content</label>
                                                            <div id="">
                                                                <Editor
                                                                    apiKey='iu3kqbs7z6b23a94nqmktcf7ay4gvdpky5fz85bh1qsv3h9x'
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
                                                            {errorMessage?.editorValueError != '' &&
                                                                <span style={{ color: "red" }}>
                                                                    {errorMessage?.editorValueError}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-4">
                                                    <button type="button" className="ct_custom_btn mx-auto d-block "
                                                        onClick={onHandleAddPrivacyPolicy}
                                                    > Submit</button>
                                                </div>
                                            </form>
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

export default TermsCondition
