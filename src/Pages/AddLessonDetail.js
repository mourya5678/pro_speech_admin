import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { pipApiResponse, pipGetToken } from '../Controllers/Pip'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import { baseUrl } from '../Routes/bakendRoutes'
import { pageRoutes } from '../Routes/pageRoutes'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddLessonDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const initialValues = {
        lessonName: '',
        lessonDetail: '',
    };

    // const onHandleAddLessonDetail = async (values) => {
    //     const token = pipGetToken();
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'accept': 'application/json',
    //         Authorization: `Bearer ${token}`
    //     }
    //     var apiResponse = await pipApiResponse('post', `${baseUrl}`, headers, true, values);
    //     console.log(apiResponse);
    // };

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
                                    <div className="card-body pt-5">
                                        <div className="card-head-row card-tools-still-right mb-5">
                                            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
                                                <a href="javascript:void(0)" onClick={() => navigate(-1)} className="ct_back_btn">
                                                    <i className="fa-solid fa-arrow-left-long"></i>
                                                </a>
                                                <h4 className="card-title ct_fw_700 mb-0 mx-auto">Add Lesson Detail</h4>
                                            </div>
                                        </div>
                                        <form className="pt-0">
                                            <div className="row" id="ct_append_quiz">
                                                <div className="col-md-12 ">
                                                    <div className="form-group p-0 mb-4 ct_custom_input">
                                                        <label className="ct_fw_600 mb-2">Lession Name</label>
                                                        <input type="text" className="form-control" id="floatingInput" placeholder="Enter Lession Name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12 ">
                                                    <div className="form-group p-0 mb-4 ct_custom_input">
                                                        <label className="ct_fw_600 mb-2">Lesson Detail</label>
                                                        <div id="container">
                                                            {/* <div id="editor"></div>
                                                            <p>This is some sample content.</p> */}
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                data="<p>Hello from CKEditor&nbsp;5!</p>"
                                                                onReady={editor => {
                                                                    // You can store the "editor" and use when it is needed.
                                                                    console.log('Editor is ready to use!', editor);
                                                                }}
                                                                onChange={(event) => {
                                                                    console.log(event);
                                                                }}
                                                                onBlur={(event, editor) => {
                                                                    console.log('Blur.', editor);
                                                                }}
                                                                onFocus={(event, editor) => {
                                                                    console.log('Focus.', editor);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-4">
                                                <button type="button" className="ct_custom_btn mx-auto d-block "> Submit</button>
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
        </div >
    )
}

export default AddLessonDetail
