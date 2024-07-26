import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Schema_otp_check } from '../Controllers/Schema';
import { pageRoutes } from '../Routes/pageRoutes';
import { Formik } from 'formik';
import { pipApiResponse } from '../Controllers/Pip';
import ErrorMessage from '../Controllers/ErrorMessage';
import { baseUrl, forgotPasswordEndPointURL, otpVerifyEndPointURL } from '../Routes/bakendRoutes';
import OtpInput from 'react-otp-input';
import Loader from '../Controllers/Loader';

const OtpCheck = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isLoader, setIsLoader] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        if (otp?.length >= 4 && otp) {
            setOtpError('');
            setIsLoader(true);
            const data = {
                email: state?.email,
                otp: otp
            }
            const headers = {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
            var apiResponse = await pipApiResponse('post', `${baseUrl + otpVerifyEndPointURL}`, headers, true, data);
            setOtp('');
            setIsLoader(false);
            apiResponse.success == true && navigate(pageRoutes?.new_password, { state: { email: state?.email } })
        } else {
            setOtpError("Please enter your 4 digit otp")
        }
    };
    
    return (
        <div className="container">
            <div className="col-md-5 mx-auto">
                <div className="ct_login_main_center">
                    <div className="ct_login_bg">
                        <div className="ct_login_head mb-5">
                            <h2 className="text-center">Otp Verification</h2>
                        </div>
                        {isLoader == true ?
                            <Loader />
                            :
                            <form className="pt-0">
                                <div className=" mb-4 ct_custom_input ct_otp_input">
                                    <OtpInput
                                        className="form-control"
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} />}
                                    />
                                    <label>Enter your otp here</label>
                                </div>
                                <div className="ct_custom_input ct_otp_input">
                                    {otpError != '' &&
                                        <span style={{ color: "red" }}>
                                            {otpError}
                                        </span>
                                    }
                                </div>
                                <div className="pt-4">
                                    <button type="submit" className="ct_custom_btn mx-auto d-block" onClick={(e) => onHandleSubmit(e)}> Submit</button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default OtpCheck
