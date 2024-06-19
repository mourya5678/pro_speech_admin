import { message, message as toast } from 'antd';
import axios from 'axios';
import moment from "moment";


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
    localStorage.clear()
    message.success("Successfully logged out")
};

// Authentication 
export const pipSaveToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token))
};

export const pipGetToken = () => {
    return JSON.parse(localStorage.getItem('token'))
};

// Get Api
export const pipApiResponse = (method, url, data = null, headers = {}) => {
    axios({
        method: method,
        url: url,
        data: data,
        headers: headers
    })
        .then((res) => {
            console.log(res);
            if (res?.data?.success == true) {
                pipSuccessMessage(res?.data?.message);
            } else {
                pipErrorMessage(res?.data?.message);
            }
            return res?.data ?? res;
        })
        .catch((err) => {
            pipErrorMessage(res?.data?.message);
            console.log(err)
        })
};