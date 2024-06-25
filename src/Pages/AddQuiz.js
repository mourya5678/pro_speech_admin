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

    useEffect(() => {
        getAllQuizDataById();
    }, []);

    const getAllQuizDataById = async () => {
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + getAllQuizByLessonIdEndPointURL + state?.value?.data?._id}`, headers, false);
        // console.log(apiResponse);
        let data = []
        if (apiResponse && apiResponse?.data?.length != 0) {
            for (var i = 0; i < apiResponse?.data?.length; i++) {
                console.log(apiResponse, "=====>>>>");
                data?.push({
                    id: i + 1,
                    Question: apiResponse?.data[i]?.questions[0]?.text,
                    Question_Eror: '',
                    Option_1: apiResponse?.data[i]?.questions[0]?.options[0],
                    Option_1_Error: '',
                    Option_2: apiResponse?.data[i]?.questions[0]?.options[1],
                    Option_2_Error: '',
                    Option_3: apiResponse?.data[i]?.questions[0]?.options[2],
                    Option_3_Error: '',
                    Option_4: apiResponse?.data[i]?.questions[0]?.options[3],
                    Option_4_Error: '',
                    Quiz_Answer: apiResponse?.data[i]?.questions[0]?.correctOption,
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
        console.log(id);
        const updatedMedicationDetails = quizQuestion.filter((item) => item.id !== id);
        setQuizQuestion(updatedMedicationDetails);
    };

    const onHandleChangeFiled = (field, index, question, value1, value2, value3, value4, answer) => {
        const updatedEmploymentHistoryDetails = [...quizQuestion];
        updatedEmploymentHistoryDetails[index].Question = question;
        updatedEmploymentHistoryDetails[index].Question_Eror = question == '' ? 'Please enter the Question' : '';
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
                console.log({ i })
                if (data12?.length == (i - 1)) {
                    console.log(i, "Hello this is the dummy test for the data")
                }
            } else {
                const updatedEmploymentHistoryDetails = [...quizQuestion];
                updatedEmploymentHistoryDetails[i].Question_Eror = quizQuestion[i].Question == '' ? 'Please enter the Question' : '';
                updatedEmploymentHistoryDetails[i].Option_1_Error = quizQuestion[i].Option_1 == '' ? 'Please enter the option' : '';
                updatedEmploymentHistoryDetails[i].Option_2_Error = quizQuestion[i].Option_2 == '' ? 'Please enter the option' : '';
                updatedEmploymentHistoryDetails[i].Option_3_Error = quizQuestion[i].Option_3 == '' ? 'Please enter the option' : '';
                updatedEmploymentHistoryDetails[i].Option_4_Error = quizQuestion[i].Option_4 == '' ? 'Please enter the option' : '';
                updatedEmploymentHistoryDetails[i].Quiz_Answer_Error = quizQuestion[i].Quiz_Answer == '' ? 'Please enter the answer' : '';
                setQuizQuestion(updatedEmploymentHistoryDetails);
            }
        }
        console.log(data12, quizQuestion?.length)
        if (data12?.length == quizQuestion?.length) {
            console.log(state)
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
            console.log(data)
            const headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                Authorization: `Bearer ${token}`
            }
            var apiResponse = await pipApiResponse('post', `${baseUrl + createQuiz == true ? addQuizInLessonEndPointURL : updateQuizByLessonIdEndPointURL + state?.value?.data?._id}`, headers, true, createQuiz == true ? data : data123);
            console.log(apiResponse);
            apiResponse?.success == true && navigate(pageRoutes.lesson, { state: { data: state?.value?.data } })
        }
    };

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
                                                <h4 className="card-title ct_fw_700 mb-0">Add Quiz</h4>
                                                <button className="ct_custom_btn ct_add_more_right" onClick={onHandleAddMoreField}><i className="fa-solid fa-plus me-2"></i> Add
                                               More</button>
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
                                            <div className="pt-4">
                                                <button type="button" className="ct_custom_btn mx-auto d-block" onClick={onHandleAddAnswer}> Submit</button>
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

export default AddQuiz