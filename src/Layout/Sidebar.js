import React, { useEffect, useState } from 'react'
import Sidebars from '../Layout/Sidebar';
import { pageRoutes } from '../Routes/pageRoutes';
import { useNavigate } from 'react-router-dom';
import { pipApiResponse, pipGetToken, pipReplaceSpace } from '../Controllers/Pip';
import { baseUrl, sideBarValuesEndPointURL } from '../Routes/bakendRoutes';

const Sidebar = () => {
    const navigate = useNavigate();
    const [sideBar, setSideBar] = useState([]);
    const [open, setOpen] = useState([]);

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
        setSideBar(apiResponse?.data ?? []);
    };

    const onHandleOpenClose = (val) => {
        if (!open?.includes(val)) {
            open?.push(val);
            setOpen(open => open?.filter(item => item));
        } else {
            setOpen(open => open?.filter(item => item != val));
        }
    }

    return (
        <div className="sidebar" data-background-color="dark">
            <div className="sidebar-logo">
                <div className="logo-header" data-background-color="dark">
                    <a href="javascript:void(0)" onClick={() => navigate(pageRoutes.home)} className="logo">
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
                        <li className="nav-item">
                            <a
                                className="collapsed"
                                onClick={() => navigate(pageRoutes.home)}
                            >
                                <p>Dashboard</p>
                            </a>
                        </li>
                        {sideBar && sideBar?.map((item) => (
                            <>
                                <li className="nav-item text-section">
                                    <a data-bs-toggle="collapse" onClick={() => onHandleOpenClose(item?.section)}>
                                        <p>{item?.section}</p>
                                        <span className="caret"></span>
                                    </a>
                                    <div className={open?.includes(item?.section) ? "collapse show" : "collapse"}>
                                        <ul className="nav nav-collapse">
                                            {item?.modules && item?.modules?.map((items) => (
                                                <li>
                                                    <a href="javascript:void(0)" onClick={() => navigate(pageRoutes.lesson, { state: { data: items, section_name: items?.module_name } })}>
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
