import React, { useEffect, useState } from 'react'
import Sidebars from '../Layout/Sidebar';
import { pageRoutes } from '../Routes/pageRoutes';
import { useNavigate } from 'react-router-dom';
import { pipApiResponse, pipGetToken, pipReplaceSpace } from '../Controllers/Pip';
import { baseUrl, sideBarValuesEndPointURL } from '../Routes/bakendRoutes';

const Sidebar = () => {
    const navigate = useNavigate();
    const [sideBar, setSideBar] = useState([]);


    useEffect(() => {
        getSideBarValue();
    }, []);

    const getSideBarValue = async () => {
        const token = pipGetToken();
        const headers = {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            Authorization: `Bearer ${token}`
        }
        var apiResponse = await pipApiResponse('get', `${baseUrl + sideBarValuesEndPointURL}`, headers, false);
        console.log(apiResponse?.data);
        setSideBar(apiResponse?.data ?? []);
    }

    return (
        <div className="sidebar" data-background-color="dark">
            <div className="sidebar-logo">
                <div className="logo-header" data-background-color="dark">
                    <a href="dashboard.html" className="logo">
                        <img
                            src="assets/img/logo.png"
                            alt="navbar brand"
                            className="navbar-brand"

                        />
                    </a>
                    <div className="nav-toggle">
                        <button className="btn btn-toggle toggle-sidebar">
                            <i className="gg-menu-right"></i>
                        </button>
                        <button className="btn btn-toggle sidenav-toggler">
                            <i className="gg-menu-left"></i>
                        </button>
                    </div>
                    <button className="topbar-toggler more">
                        <i className="gg-more-vertical-alt"></i>
                    </button>
                </div>
            </div>
            <div className="sidebar-wrapper scrollbar scrollbar-inner">
                <div className="sidebar-content">
                    <ul className="nav nav-secondary">
                        <li className="nav-item active">
                            <a
                                className="collapsed"
                                onClick={() => navigate(pageRoutes.home)}
                            >
                                <p>Dashboard</p>

                            </a>
                        </li>
                        {sideBar && sideBar?.map((item) => (
                            <>
                                <li className="nav-section">
                                    <h4 className="text-section">{item?.section}</h4>
                                </li>
                                <li className="nav-item">
                                    <a data-bs-toggle="collapse" href={`#${pipReplaceSpace(item?.section)}`}>
                                        <p>{item?.section}</p>
                                        <span className="caret"></span>
                                    </a>
                                    <div className="collapse" id={pipReplaceSpace(item?.section)}>
                                        <ul className="nav nav-collapse">
                                            {item?.modules && item?.modules?.map((items) => (
                                                <li>
                                                    <a href="javascript:void(0)" onClick={() => navigate(pageRoutes.lesson, { state: { data: items } })}>
                                                        <span className="sub-item">{items?.module_name}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
