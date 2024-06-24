import React from 'react'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'

const ChangePassword = () => {
    return (
        <div class="wrapper">
            <Sidebar />
            <div class="main-panel">
                <Header />
                <div class="container">
                    <div class="page-inner">
                        <div class="row">
                            <div class="col-md-10 mx-auto">
                                <div class="card card-round">
                                    <div class="card-body">
                                        <div class="card-head-row card-tools-still-right mb-5">
                                            <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap w-100">
                                                <h4 class="card-title ct_fw_700 mb-0">Change Password</h4>
                                            </div>
                                        </div>

                                        <form action="" class="pt-0">
                                            <div class="form-floating mb-4 ct_custom_input">
                                                <input type="email" class="form-control"
                                                    id="floatingInput" placeholder="name@example.com" />
                                                <label for="floatingInput">Current Passowrd</label>
                                            </div>
                                            <div class="form-floating mb-4 ct_custom_input">
                                                <input type="email" class="form-control"
                                                    id="floatingInput" placeholder="name@example.com" />
                                                <label for="floatingInput">New Passowrd</label>
                                            </div>
                                            <div class="form-floating ct_custom_input mb-4">
                                                <input type="password" class="form-control"
                                                    id="floatingPassword" placeholder="Password" />
                                                <label for="floatingPassword">Confirm Password</label>
                                            </div>
                                            <div class="pt-4">
                                                <button type="button" class="ct_custom_btn mx-auto d-block "> Submit</button>
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
        </div>
    )
}

export default ChangePassword
