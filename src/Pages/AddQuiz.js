import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { pipApiResponse, pipGetToken } from '../Controllers/Pip';
import { useNavigate } from 'react-router-dom';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from '../Layout/Sidebar';
import { addQuizInLessonEndPointURL, baseUrl, getAllQuizByLessonIdEndPointURL, updateQuizByLessonIdEndPointURL } from '../Routes/bakendRoutes';
import { pageRoutes } from '../Routes/pageRoutes';

const AddQuiz = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [quizQuestion, setQuizQuestion] = useState([]);
    const [createQuiz, setCreateQuiz] = useState(false);
    const [quizId, setQuizId] = useState();
    const [isLoader, setIsLoader] = useState(false);


    useEffect(() => {
        getAllQuizDataById();
    }, []);

    const getAllQuizDataById = async () => {
        setIsLoader(true);
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + getAllQuizByLessonIdEndPointURL + state?.value?.data?._id}`, headers, false);
        let data = []
        if (apiResponse && apiResponse?.data?.length != 0) {
            setQuizId(apiResponse?.data[0]?._id)
            for (var i = 0; i < apiResponse?.data[0]?.questions?.length; i++) {
                data?.push({
                    id: i + 1,
                    Question: apiResponse?.data[0]?.questions[i]?.text,
                    Question_Eror: '',
                    Option_1: apiResponse?.data[0]?.questions[i]?.options[0],
                    Option_1_Error: '',
                    Option_2: apiResponse?.data[0]?.questions[i]?.options[1],
                    Option_2_Error: '',
                    Option_3: apiResponse?.data[0]?.questions[i]?.options[2],
                    Option_3_Error: '',
                    Option_4: apiResponse?.data[0]?.questions[i]?.options[3],
                    Option_4_Error: '',
                    Quiz_Answer: apiResponse?.data[0]?.questions[i]?.correctOption,
                    Quiz_Answer_Error: ''
                })
            }
        } else {
            setCreateQuiz(true);
            data?.push({
                id: 1,
                Question: '',
                Question_Eror: '',
                Option_1: '',
                Option_1_Error: '',
                Option_2: '',
                Option_2_Error: '',
                Option_3: '',
                Option_3_Error: '',
                Option_4: '',
                Option_4_Error: '',
                Quiz_Answer: '',
                Quiz_Answer_Error: ''
            })
        }
        setQuizQuestion(data);
        setIsLoader(false);
    }

    const onHandleAddMoreField = () => {
        setQuizQuestion([...quizQuestion, {
            id: (quizQuestion[quizQuestion.length - 1].id) + 1,
            Question: '',
            Question_Eror: '',
            Option_1: '',
            Option_1_Error: '',
            Option_2: '',
            Option_2_Error: '',
            Option_3: '',
            Option_3_Error: '',
            Option_4: '',
            Option_4_Error: '',
            Quiz_Answer: '',
            Quiz_Answer_Error: ''
        }]);

    };

    const onHandleDeleteField = (id) => {
        const updatedMedicationDetails = quizQuestion.filter((item) => item.id !== id);
        setQuizQuestion(updatedMedicationDetails);
    };

    const onHandleChangeFiled = (field, index, question, value1, value2, value3, value4, answer) => {
        const updatedEmploymentHistoryDetails = [...quizQuestion];
        updatedEmploymentHistoryDetails[index].Question = question;
        updatedEmploymentHistoryDetails[index].Question_Eror = question == '' ? 'Please enter the question' : '';
        updatedEmploymentHistoryDetails[index].Option_1 = value1
        updatedEmploymentHistoryDetails[index].Option_1_Error = value1 == '' ? 'Please enter the option' : '';
        updatedEmploymentHistoryDetails[index].Option_2 = value2;
        updatedEmploymentHistoryDetails[index].Option_2_Error = value2 == '' ? 'Please enter the option' : '';
        updatedEmploymentHistoryDetails[index].Option_3 = value3;
        updatedEmploymentHistoryDetails[index].Option_3_Error = value3 == '' ? 'Please enter the option' : '';
        updatedEmploymentHistoryDetails[index].Option_4 = value4;
        updatedEmploymentHistoryDetails[index].Option_4_Error = value4 == '' ? 'Please enter the option' : '';
        updatedEmploymentHistoryDetails[index].Quiz_Answer = answer;
        updatedEmploymentHistoryDetails[index].Quiz_Answer_Error = answer == '' ? 'Please enter the answer' : '';
        setQuizQuestion(updatedEmploymentHistoryDetails);
    };

    const onHandleAddAnswer = async () => {
        let data12 = [];
        for (var i = 0; i < quizQuestion?.length; i++) {
            if (quizQuestion[i]?.Question != '' && quizQuestion[i]?.Option_1 != '' && quizQuestion[i]?.Option_2 != '' &&
                quizQuestion[i]?.Option_3 != '' && quizQuestion[i]?.Option_4 != '' && quizQuestion[i]?.Quiz_Answer != '') {
                data12.push({
                    "text": quizQuestion[i]?.Question,
                    "options": [quizQuestion[i]?.Option_1, quizQuestion[i]?.Option_2, quizQuestion[i]?.Option_3, quizQuestion[i]?.Option_4],
                    "correctOption": quizQuestion[i]?.Quiz_Answer
                });
            } else {
                const updatedEmploymentHistoryDetails = [...quizQuestion];
                updatedEmploymentHistoryDetails[i].Question_Eror = quizQuestion[i].Question == '' ? 'Please enter the question' : '';
                updatedEmploymentHistoryDetails[i].Option_1_Error = quizQuestion[i].Option_1 == '' ? 'Please enter the option' : '';
                updatedEmploymentHistoryDetails[i].Option_2_Error = quizQuestion[i].Option_2 == '' ? 'Please enter the option' : '';
                updatedEmploymentHistoryDetails[i].Option_3_Error = quizQuestion[i].Option_3 == '' ? 'Please enter the option' : '';
                updatedEmploymentHistoryDetails[i].Option_4_Error = quizQuestion[i].Option_4 == '' ? 'Please enter the option' : '';
                updatedEmploymentHistoryDetails[i].Quiz_Answer_Error = quizQuestion[i].Quiz_Answer == '' ? 'Please enter the answer' : '';
                setQuizQuestion(updatedEmploymentHistoryDetails);
            }
        };
        console.log(data12, quizQuestion?.length)
        if (data12?.length == quizQuestion?.length) {
            setIsLoader(true);
            const data = {
                quiz_name: state?.value?.data?.module_name,
                questions: data12,
                lesson_id: state?.value?.data?._id
            }
            const data123 = {
                quiz_name: state?.value?.data?.module_name,
                questions: data12,
            }
            const token = pipGetToken();
            const headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                Authorization: `Bearer ${token}`
            }
            const baseurlData = baseUrl + updateQuizByLessonIdEndPointURL + quizId
            const basicUrl = baseUrl + addQuizInLessonEndPointURL
            var apiResponse = await pipApiResponse(createQuiz == true ? 'post' : 'put', createQuiz == true ? basicUrl : baseurlData, headers, true, createQuiz == true ? data : data123);
            setIsLoader(false);
            apiResponse?.success == true && navigate(-1, { state: { data: state?.value?.data } })
        };
    };

    return (
        <div className="wrapper">
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
                                            <form className="pt-0">
                                                {quizQuestion && quizQuestion?.map((item, i) => (
                                                    <div className="row ct_append_quiz" id="ct_append_quiz">
                                                        {quizQuestion?.length != 1 && <button type="button" className="ct_delete_btn ct_quiz_delete" onClick={() => onHandleDeleteField(item?.id)}><i className="fa-solid fa-trash"></i></button>}
                                                        <div className="col-md-12 ">
                                                            <div className="form-group p-0 mb-4 ct_custom_input">
                                                                <label className="ct_fw_600 mb-2">Question {i + 1}</label>
                                                                <input type="text" className="form-control" value={item?.Question} onChange={(e) => onHandleChangeFiled("Question", i, e.target.value, item?.Option_1, item?.Option_2, item?.Option_3, item?.Option_4, item?.Quiz_Answer)} id="floatingInput" placeholder="Enter Question" />
                                                                {item?.Question_Eror != '' &&
                                                                    <span style={{ color: "red" }}>
                                                                        {item?.Question_Eror}
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 ">
                                                            <div className="form-group p-0 mb-4 ct_custom_input">
                                                                <label className="ct_fw_600 mb-2">Option 1</label>
                                                                <input type="text" className="form-control"
                                                                    value={item?.Option_1} onChange={(e) => onHandleChangeFiled("Option_1", i, item?.Question, e.target.value, item?.Option_2, item?.Option_3, item?.Option_4, item?.Quiz_Answer)}
                                                                    id="floatingInput" placeholder="Enter Question" />
                                                                {item?.Option_1_Error != '' &&
                                                                    <span style={{ color: "red" }}>
                                                                        {item?.Option_1_Error}
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 ">
                                                            <div className="form-group p-0 mb-4 ct_custom_input">
                                                                <label className="ct_fw_600 mb-2">Option 2</label>
                                                                <input type="text" className="form-control"
                                                                    value={item?.Option_2} onChange={(e) => onHandleChangeFiled("Option_2", i, item?.Question, item?.Option_1, e.target.value, item?.Option_3, item?.Option_4, item?.Quiz_Answer)}
                                                                    id="floatingInput" placeholder="Enter Question" />
                                                                {item?.Option_2_Error != '' &&
                                                                    <span style={{ color: "red" }}>
                                                                        {item?.Option_2_Error}
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 ">
                                                            <div className="form-group p-0 mb-4 ct_custom_input">
                                                                <label className="ct_fw_600 mb-2">Option 3</label>
                                                                <input type="text" className="form-control"
                                                                    value={item?.Option_3} onChange={(e) => onHandleChangeFiled("Option_3", i, item?.Question, item?.Option_1, item?.Option_2, e.target.value, item?.Option_4, item?.Quiz_Answer)}
                                                                    id="floatingInput" placeholder="Enter Question" />
                                                                {item?.Option_3_Error != '' &&
                                                                    <span style={{ color: "red" }}>
                                                                        {item?.Option_3_Error}
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 ">
                                                            <div className="form-group p-0 mb-4 ct_custom_input">
                                                                <label className="ct_fw_600 mb-2">Option 4</label>
                                                                <input type="text" className="form-control"
                                                                    value={item?.Option_4} onChange={(e) => onHandleChangeFiled("Option_4", i, item?.Question, item?.Option_1, item?.Option_2, item?.Option_3, e.target.value, item?.Quiz_Answer)}
                                                                    id="floatingInput" placeholder="Enter Question" />
                                                                {item?.Option_4_Error != '' &&
                                                                    <span style={{ color: "red" }}>
                                                                        {item?.Option_4_Error}
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 ">
                                                            <div className="form-group p-0 mb-4 ct_custom_input">
                                                                <label className="ct_fw_600 mb-2">Quiz Answer</label>
                                                                <input type="text" className="form-control"
                                                                    value={item?.Quiz_Answer} onChange={(e) => onHandleChangeFiled("Quiz_Answer", i, item?.Question, item?.Option_1, item?.Option_2, item?.Option_3, item?.Option_4, e.target.value)}
                                                                    id="floatingInput" placeholder="Enter Answer" />
                                                                {item?.Quiz_Answer_Error != '' &&
                                                                    <span style={{ color: "red" }}>
                                                                        {item?.Quiz_Answer_Error}
                                                                    </span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="pt-4 d-flex align-items-center gap-3 justify-content-center">
                                                    <button className="ct_custom_btn ct_add_more_right" onClick={onHandleAddMoreField}><i className="fa-solid fa-plus me-2"></i> Add
                                               More</button>
                                                    <button type="button" className="ct_custom_btn d-block" onClick={onHandleAddAnswer}> Submit</button>

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

export default AddQuiz