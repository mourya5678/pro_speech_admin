import { message, message as toast } from 'antd';
import axios from 'axios';
import moment from "moment";
import { baseUrl } from '../Routes/bakendRoutes';

// Toast Message
export const pipSuccessMessage = (message) => {
    return toast.success(message)
};

export const pipErrorMessage = (message) => {
    return toast.error(message)
};

// Date Format
export const pipDateFormate = (date) => {
    const formattedDate = moment(date).format('DD/MM/YYYY')
    return formattedDate;
};

// Clear Localstorage
export const pipDeleteToken = () => {
    localStorage.clear();
    message.success("Successfully logged out")
};

// Authentication 
export const pipSaveToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
};

export const pipGetToken = () => {
    return JSON.parse(localStorage.getItem('token'));
};

export const pipSaveUserData = (token) => {
    localStorage.setItem('user_info', JSON.stringify(token));
};

export const pipGetUserData = () => {
    JSON.parse(localStorage.setItem('user_info'));
};

// Get Api
export const pipApiResponse = async (method, url, headers = {}, isToast, data = null) => {
    try {
        const res = await axios({
            method: method,
            url: url,
            data: data,
            headers: headers
        });
        console.log(res);
        if (res?.data?.success == true) {
            isToast == true && pipSuccessMessage(res?.data?.message);
        } else {
            isToast == true && pipErrorMessage(res?.data?.message);
        }
        return res?.data;
    } catch (err) {
        isToast == true && pipErrorMessage(err?.response?.data?.message ?? "Internal server error");
        console.log(err);
    }
};

export const pipReplaceSpace = (value) => {
    let data = '';
    let name = value.split(' ')
    name?.map((item) => (
        data += item
    ))
    return data;
};