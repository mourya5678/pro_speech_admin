import { Editor } from '@tinymce/tinymce-react';
import Header from '../Layout/Header';
import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Controllers/Loader';
import Footer from '../Layout/Footer';
import Sidebar from '../Layout/Sidebar';
import { message } from 'antd';
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';
import { baseUrl, updateQuizByIdEndPointURL } from '../Routes/bakendRoutes';

const AddQuiz = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isToggle, setIsToggle] = useState(false);
    const [isToggle1, setIsToggle1] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const [quizAnswer, setQuizAnswer] = useState({
        answer1: '',
        answer1Error: '',
        answer2: '',
        answer2Error: '',
        answer3: '',
        answer3Error: '',
        answer4: '',
        answer4Error: ''
    });
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [correctAnswerError, setCorrectAnswerError] = useState('');
    const [questionError, setQuestionError] = useState('')
    const [questionOptions, setQuestionOptions] = useState(['text', 'text', 'text', 'text']);
    const [addQuizFor, setAddQuizFor] = useState('');
    const question = useRef(null);
    let questions = state?.data?.text ?? '';

    const onHandleDataChange = (val, val2, val3, val4, index) => {
        setQuizAnswer({
            ...quizAnswer,
            answer1: val,
            answer1Error: val != '' ? '' : 'Please Fill Option 1',
            answer2: val2,
            answer2Error: val2 != '' ? '' : 'Please Fill Option 2',
            answer3: val3,
            answer3Error: val3 != '' ? '' : 'Please Fill Option 3',
            answer4: val4,
            answer4Error: val4 != '' ? '' : 'Please Fill Option 4',
        })
        if (index == 0) {
            if ((typeof val) == 'object') {
                const value = val?.name?.split('.');
                if (value[value?.length - 1] == 'mp3' || value[value?.length - 1] == 'wav' || value[value?.length - 1] == 'aif') {
                    console.log(value[value?.length - 1])
                    questionOptions[index] = 'audio';
                } else {
                    questionOptions[index] = 'image';
                }
                setQuestionOptions(questionOptions => questionOptions?.filter(item => item))
            } else {
                questionOptions[index] = 'text';
                setQuestionOptions(questionOptions => questionOptions?.filter(item => item))
            }
        } else if (index == 1) {
            if ((typeof val2) == 'object') {
                const value = val2?.name?.split('.');
                if (value[value?.length - 1] == 'mp3' || value[value?.length - 1] == 'wav' || value[value?.length - 1] == 'aif') {
                    console.log(value[value?.length - 1])
                    questionOptions[index] = 'audio';
                } else {
                    questionOptions[index] = 'image';
                }
                setQuestionOptions(questionOptions => questionOptions?.filter(item => item))
            } else {
                questionOptions[index] = 'text';
                setQuestionOptions(questionOptions => questionOptions?.filter(item => item))
            }
        } else if (index == 2) {
            if ((typeof val3) == 'object') {
                const value = val3?.name?.split('.');
                if (value[value?.length - 1] == 'mp3' || value[value?.length - 1] == 'wav' || value[value?.length - 1] == 'aif') {
                    console.log(value[value?.length - 1])
                    questionOptions[index] = 'audio';
                } else {
                    questionOptions[index] = 'image';
                }
                setQuestionOptions(questionOptions => questionOptions?.filter(item => item))
            } else {
                questionOptions[index] = 'text';
                setQuestionOptions(questionOptions => questionOptions?.filter(item => item))
            }
        } else if (index == 3) {
            if ((typeof val4) == 'object') {
                const value = val4?.name?.split('.');
                if (value[value?.length - 1] == 'mp3' || value[value?.length - 1] == 'wav' || value[value?.length - 1] == 'aif') {
                    console.log(value[value?.length - 1])
                    questionOptions[index] = 'audio';
                } else {
                    questionOptions[index] = 'image';
                }
                setQuestionOptions(questionOptions => questionOptions?.filter(item => item))
            } else {
                questionOptions[index] = 'text';
                setQuestionOptions(questionOptions => questionOptions?.filter(item => item))
            }
        }
    };

    const selectCorrectAnswer = (val) => {
        setCorrectAnswer(val);
        setCorrectAnswerError('')
    };

    const onHandleAddAnswer = async () => {
        if (addQuizFor == "MCQ") {
            const textData = question?.current?.getContent();
            if (textData && quizAnswer?.answer1 && quizAnswer?.answer2 && quizAnswer?.answer3 && quizAnswer?.answer4 && correctAnswer) {
                setIsLoader(true);
                setQuestionError('');
                const token = pipGetToken();
                const formData = new FormData();
                formData.append('text', textData);
                formData.append('correctOption', correctAnswer);
                formData.append('options', quizAnswer?.answer1);
                formData.append('options', quizAnswer?.answer2);
                formData.append('options', quizAnswer?.answer3);
                formData.append('options', quizAnswer?.answer4);
                formData.append('type', addQuizFor);
                const headers = {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                var apiResponse = await pipApiResponse('post', `${baseUrl + updateQuizByIdEndPointURL + state?.lesson_id}/questions`, headers, true, formData);
                apiResponse?.success == true && navigate(-1);
                setIsLoader(false);
            } else {
                setQuizAnswer({
                    ...quizAnswer,
                    answer1: quizAnswer?.answer1,
                    answer1Error: quizAnswer?.answer1 != '' ? '' : 'Please Fill Option 1',
                    answer2: quizAnswer?.answer2,
                    answer2Error: quizAnswer?.answer2 != '' ? '' : 'Please Fill Option 2',
                    answer3: quizAnswer?.answer3,
                    answer3Error: quizAnswer?.answer3 != '' ? '' : 'Please Fill Option 3',
                    answer4: quizAnswer?.answer4,
                    answer4Error: quizAnswer?.answer4 != '' ? '' : 'Please Fill Option 4',
                })
                textData == '' && setQuestionError("Please Enter Question")
                if (correctAnswer == '') {
                    setCorrectAnswerError("Please select the Answer")
                }
            }
        } else if (addQuizFor == "FILL_IN_THE_BLANK") {
            const textData = question?.current?.getContent();
            if (textData && correctAnswer) {
                setIsLoader(true);
                const token = pipGetToken();
                const headers = {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                const formData = new FormData();
                formData.append('text', textData);
                formData.append('correctOption', correctAnswer);
                formData.append('type', addQuizFor);
                var apiResponse = await pipApiResponse('post', `${baseUrl + updateQuizByIdEndPointURL + state?.lesson_id}/questions`, headers, true, formData);
                apiResponse?.success == true && navigate(-1);
                setIsLoader(false);
            } else {
                textData == '' && setQuestionError("Please Enter Question")
                correctAnswer == '' && setCorrectAnswerError("Please Enter correct answer")
            }
        }
    };

    const onChangeCurrectAnswer = (val) => {
        setCorrectAnswer(val);
        if (val == "") {
            setCorrectAnswerError("Please enter correct answer");
        } else {
            setCorrectAnswerError("");
        }
    }

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
                                                <div className="d-flex align-items-center  gap-3 flex-wrap w-100">
                                                    <a href="javascript:void(0)" onClick={() => navigate(-1)} className="ct_back_btn">
                                                        <i className="fa-solid fa-arrow-left-long"></i>
                                                    </a>
                                                    <h4 className="card-title ct_fw_700 mb-0 mx-auto">Add Quiz</h4>
                                                </div>
                                            </div>
                                            {addQuizFor == '' &&
                                                <div className="row">
                                                    <div className="col-md-10 mx-auto">
                                                        <div className="row">
                                                            <div className="col-md-6 mb-4 mb-md-0">
                                                                <button className="ct_mcq_btns ct_custom_btn" type="button" onClick={() => setAddQuizFor("MCQ")}>
                                                                    Want to add MCQ?
                                                            </button>
                                                            </div>
                                                            <div className="col-md-6 mb-4 mb-md-0">
                                                                <button className="ct_fill_blanks_btn ct_mcq_btns ct_custom_btn" type="button" onClick={() => setAddQuizFor("FILL_IN_THE_BLANK")}>
                                                                    Want to add fill in the blanks?
                                                            </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {addQuizFor &&
                                                <form className="pt-0">
                                                    <div className="row ct_append_quiz" id="ct_append_quiz">
                                                        <div className="col-md-12 ">
                                                            <div className="form-group p-0 mb-4 ct_custom_input">
                                                                <label className="ct_fw_600 mb-2">Question</label>
                                                                <div id="">
                                                                    <Editor
                                                                        apiKey='utc9w7lm5ym3sm21k8qj60va6g446pxihgy2olr03e2pvx0l'
                                                                        onInit={(evt, editor) =>
                                                                            (question.current = editor)
                                                                        }
                                                                        onChange={(evt, editor) => setQuestionError("")}
                                                                        init={{
                                                                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                                                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                                            tinycomments_mode: 'embedded',
                                                                            tinycomments_author: 'Author name',
                                                                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                                                        }}
                                                                        initialValue={questions}
                                                                    />
                                                                </div>
                                                                {questionError != '' &&
                                                                    <span className="mb-2 d-block" style={{ color: "red" }}>
                                                                        {questionError}
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                        {addQuizFor == "MCQ" ?
                                                            <>
                                                                <div className="col-md-6 ">
                                                                    <div className="form-group p-0 mb-4 ct_custom_input">
                                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                                            <input type="checkbox" className="ct_custom_checkbox"
                                                                                checked={correctAnswer != "" ? correctAnswer == quizAnswer?.answer1 ? true : false : false}
                                                                                onClick={() => selectCorrectAnswer(quizAnswer?.answer1)}
                                                                            />
                                                                            <label className="ct_fw_600 mb-0">Option 1</label>
                                                                        </div>
                                                                        {correctAnswerError != '' &&
                                                                            <span className="mb-2 d-block" style={{ color: "red" }}>
                                                                                {correctAnswerError}
                                                                            </span>
                                                                        }
                                                                        <input
                                                                            type="file"
                                                                            className="form-control"
                                                                            accept="image/*,audio/mp3,audio/wav,audio/aiff"
                                                                            onChange={(e) =>
                                                                                onHandleDataChange(e.target.files[0], quizAnswer?.answer2, quizAnswer?.answer3, quizAnswer?.answer4, '0')
                                                                            }
                                                                        />
                                                                        <input type="text" className="form-control"
                                                                            value={(typeof quizAnswer?.answer1) != 'object' ? quizAnswer?.answer1 : ' '}
                                                                            onChange={(e) =>
                                                                                onHandleDataChange(e.target.value, quizAnswer?.answer2, quizAnswer?.answer3, quizAnswer?.answer4, '0')
                                                                            }
                                                                            id="floatingInput" placeholder="Enter Answer" />
                                                                        {(typeof quizAnswer?.answer1) == 'object' && questionOptions[0] == 'image' &&
                                                                            <img style={{ width: "150px", height: '100px' }} src={URL.createObjectURL(quizAnswer?.answer1)} />
                                                                        }
                                                                        {(typeof quizAnswer?.answer1) == 'object' && questionOptions[0] == 'audio' &&
                                                                            <audio controls src={URL.createObjectURL(quizAnswer?.answer1)} style={{ width: "250px", height: '50' }} />
                                                                        }
                                                                        {quizAnswer?.answer1Error != '' &&
                                                                            <span style={{ color: "red" }}>
                                                                                {quizAnswer?.answer1Error}
                                                                            </span>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 ">
                                                                    <div className="form-group p-0 mb-4 ct_custom_input">
                                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                                            <input type="checkbox" className="ct_custom_checkbox"
                                                                                checked={correctAnswer != "" ? correctAnswer == quizAnswer?.answer2 ? true : false : false}
                                                                                onClick={() => selectCorrectAnswer(quizAnswer?.answer2)}
                                                                            />
                                                                            <label className="ct_fw_600 mb-0">Option 2</label>
                                                                        </div>
                                                                        {correctAnswerError != '' &&
                                                                            <span className="mb-2 d-block" style={{ color: "red" }}>
                                                                                {correctAnswerError}
                                                                            </span>
                                                                        }
                                                                        <input
                                                                            type="file"
                                                                            className="form-control"
                                                                            accept="image/*,audio/mp3,audio/wav,audio/aiff"
                                                                            onChange={(e) =>
                                                                                onHandleDataChange(quizAnswer?.answer1, e.target.files[0], quizAnswer?.answer3, quizAnswer?.answer4, '1')
                                                                            }
                                                                        />
                                                                        <input type="text" className="form-control"
                                                                            value={(typeof quizAnswer?.answer2) != 'object' ? quizAnswer?.answer2 : ' '}
                                                                            onChange={(e) =>
                                                                                onHandleDataChange(quizAnswer?.answer1, e.target.value, quizAnswer?.answer3, quizAnswer?.answer4, '1')
                                                                            }
                                                                            id="floatingInput" placeholder="Enter Answer" />
                                                                        {(typeof quizAnswer?.answer2) == 'object' && questionOptions[1] == 'image' &&
                                                                            <img style={{ width: "150px", height: '100px' }} src={URL.createObjectURL(quizAnswer?.answer2)} />
                                                                        }
                                                                        {(typeof quizAnswer?.answer2) == 'object' && questionOptions[1] == 'audio' &&
                                                                            <audio controls src={URL.createObjectURL(quizAnswer?.answer2)} style={{ width: "250px", height: '50' }} />
                                                                        }
                                                                        {quizAnswer?.answer2Error != '' &&
                                                                            <span style={{ color: "red" }}>
                                                                                {quizAnswer?.answer2Error}
                                                                            </span>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 ">
                                                                    <div className="form-group p-0 mb-4 ct_custom_input">
                                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                                            <input type="checkbox" className="ct_custom_checkbox"
                                                                                checked={correctAnswer != "" ? correctAnswer == quizAnswer?.answer3 ? true : false : false}
                                                                                onClick={() => selectCorrectAnswer(quizAnswer?.answer3)}
                                                                            />
                                                                            <label className="ct_fw_600 mb-0">Option 3</label>
                                                                        </div>
                                                                        {correctAnswerError != '' &&
                                                                            <span className="mb-2 d-block" style={{ color: "red" }}>
                                                                                {correctAnswerError}
                                                                            </span>
                                                                        }
                                                                        <input
                                                                            type="file"
                                                                            className="form-control"
                                                                            accept="image/*,audio/mp3,audio/wav,audio/aiff"
                                                                            onChange={(e) =>
                                                                                onHandleDataChange(quizAnswer?.answer1, quizAnswer?.answer2, e.target.files[0], quizAnswer?.answer4, '2')
                                                                            }
                                                                        />
                                                                        <input type="text" className="form-control"
                                                                            value={(typeof quizAnswer?.answer3) != 'object' ? quizAnswer?.answer3 : ' '}
                                                                            onChange={(e) =>
                                                                                onHandleDataChange(quizAnswer?.answer1, quizAnswer?.answer2, e.target.value, quizAnswer?.answer4, '2')
                                                                            }
                                                                            id="floatingInput" placeholder="Enter Answer" />
                                                                        {(typeof quizAnswer?.answer3) == 'object' && questionOptions[2] == 'image' &&
                                                                            <img style={{ width: "150px", height: '100px' }} src={URL.createObjectURL(quizAnswer?.answer3)} />
                                                                        }
                                                                        {(typeof quizAnswer?.answer3) == 'object' && questionOptions[2] == 'audio' &&
                                                                            <audio controls src={URL.createObjectURL(quizAnswer?.answer3)} style={{ width: "250px", height: '50' }} />
                                                                        }
                                                                        {quizAnswer?.answer3Error != '' &&
                                                                            <span style={{ color: "red" }}>
                                                                                {quizAnswer?.answer3Error}
                                                                            </span>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 ">
                                                                    <div className="form-group p-0 mb-4 ct_custom_input">
                                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                                            <input type="checkbox" className="ct_custom_checkbox"
                                                                                checked={correctAnswer != "" ? correctAnswer == quizAnswer?.answer4 ? true : false : false}
                                                                                onClick={() => selectCorrectAnswer(quizAnswer?.answer4)}
                                                                            />
                                                                            <label className="ct_fw_600 mb-0">Option 4</label>
                                                                        </div>
                                                                        {correctAnswerError != '' &&
                                                                            <span className="mb-2 d-block" style={{ color: "red" }}>
                                                                                {correctAnswerError}
                                                                            </span>
                                                                        }
                                                                        <input
                                                                            type="file"
                                                                            className="form-control"
                                                                            accept="image/*,audio/mp3,audio/wav,audio/aiff"
                                                                            onChange={(e) =>
                                                                                onHandleDataChange(quizAnswer?.answer1, quizAnswer?.answer2, quizAnswer?.answer3, e.target.files[0], '3')
                                                                            }
                                                                        />
                                                                        <input type="text" className="form-control"
                                                                            value={(typeof quizAnswer?.answer4) != 'object' ? quizAnswer?.answer4 : ' '}
                                                                            onChange={(e) =>
                                                                                onHandleDataChange(quizAnswer?.answer1, quizAnswer?.answer2, quizAnswer?.answer3, e.target.value, '3')
                                                                            }
                                                                            id="floatingInput" placeholder="Enter Answer" />
                                                                        {(typeof quizAnswer?.answer4) == 'object' && questionOptions[3] == 'image' &&
                                                                            <img style={{ width: "150px", height: '100px' }} src={URL.createObjectURL(quizAnswer?.answer4)} />
                                                                        }
                                                                        {(typeof quizAnswer?.answer4) == 'object' && questionOptions[3] == 'audio' &&
                                                                            <audio controls src={URL.createObjectURL(quizAnswer?.answer4)} style={{ width: "250px", height: '50' }} />
                                                                        }
                                                                        {quizAnswer?.answer4Error != '' &&
                                                                            <span style={{ color: "red" }}>
                                                                                {quizAnswer?.answer4Error}
                                                                            </span>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <div className="col-md-6 ">
                                                                <div className="form-group p-0 mb-4 ct_custom_input">
                                                                    <input type="text" className="form-control"
                                                                        value={correctAnswer}
                                                                        onChange={(e) => onChangeCurrectAnswer(e.target.value)}
                                                                        placeholder="Enter Correct Answer" />
                                                                </div>
                                                                {correctAnswerError != '' &&
                                                                    <span className="mb-2 d-block" style={{ color: "red" }}>
                                                                        {correctAnswerError}
                                                                    </span>
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="pt-4 d-flex align-items-center gap-3 justify-content-center">
                                                        <button
                                                            type="button"
                                                            className="ct_custom_btn d-block"
                                                            onClick={onHandleAddAnswer}
                                                        > Submit</button>
                                                    </div>
                                                </form>
                                            }
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

export default AddQuiz;