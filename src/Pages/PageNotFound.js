import React from 'react'
import { pageRoutes } from '../Routes/pageRoutes'
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="ct_page_not_found_bg">
            <div className="ct_page_not_found_section">
                <h1 className="ct_page_not_found_error">404</h1>
                <div className="ct_page_not_found_page">Ooops!!! The page you are looking for is not found</div>
                <a className="back-home" href="javascript:void(0)" onClick={() => navigate(pageRoutes.home)}>Back to home</a>
            </div>
        </div>
    )
}

export default PageNotFound