import React, { useState } from "react";
import { CCard, CCol, CRow, CCardBody } from "@coreui/react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { AppSidebar, AppFooter, AppHeader } from "../../components/index";
import { setrate } from "../../../services/Api";

const Index = () => {
    const [inputData, setInputData] = useState({
        hourly: "",
        daily: "",
        discription: "",
    });

    const submitUserData = async (e) => {
        e.preventDefault();
        const { hourly, daily, contract, discription } = inputData;

        if (hourly === "") {
            toast.error("Hourly rate is required");
        } else if (daily === "") {
            toast.error("Daily rate is required");
        } else if (contract === "") {
            toast.error("Contract rate is required");
        } else if (discription === "") {
            toast.error("Description is required");
        } else {
            const data = {
                hourly: hourly,
                daily: daily,
                contract: contract,
                discription: discription,
            };

            try {
                const response = await setrate(data);
                console.log("Response==============>>>", response);
                if (response.status === 200) {
                    toast.success("Set Rate Successfully");
                    setInputData({
                        ...inputData,
                        hourly: "",
                        daily: "",
                        contract: "",
                        discription: "",
                    });
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
                console.error(error);
            }
        }
    };

    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <>
                        <CRow>
                            <CCol xs={12}>
                                <h4 className="mb-3">Service Rates</h4>
                                <CCard className="mb-4">
                                    <CCardBody>
                                        <br />
                                        <input
                                            type="number"
                                            onChange={setInputValue}
                                            className="form-control mb-3"
                                            value={inputData.hourly}
                                            placeholder="Enter Hourly rate of your Service"
                                            name="hourly"
                                        />
                                        <input
                                            type="number"
                                            onChange={setInputValue}
                                            className="form-control mb-3"
                                            value={inputData.daily}
                                            placeholder="Enter Daily rate of your Service"
                                            name="daily"
                                        />
                                        <input
                                            type="number"
                                            onChange={setInputValue}
                                            className="form-control mb-3"
                                            value={inputData.contract}
                                            placeholder="Enter Contract rate of your Service"
                                            name="contract"
                                        />
                                        <input
                                            type="text"
                                            onChange={setInputValue}
                                            className="form-control mb-3"
                                            value={inputData.discription}
                                            placeholder="Description"
                                            name="discription"
                                        />
                                        <div className="text-end">
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                                onClick={submitUserData}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <ToastContainer />
                    </>
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default Index;
