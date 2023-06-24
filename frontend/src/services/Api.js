import { commonrequest } from "./ApiCall";
import { BASE_URL } from "./Helper";


export const uploadFile = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/uploadFile`, data)
}

export const registerFunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/auth/signup`, data)
}

export const loginFunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/auth/login`, data)
}

export const catogoryFunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/product/category/add`, data)
}

export const productFunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/product/create`, data)
}

export const getProfileFunc = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/users/profile/${id}`, id)
}

export const getAllUserTypeFunc = async () => {
    return await commonrequest("GET", `${BASE_URL}/users`, "")
}
export const getAllUserTypeFuncPub = async () => {
    return await commonrequest("GET", `${BASE_URL}/allusers`, "")
}

export const getProductCategoryFunc = async () => {
    return await commonrequest("GET", `${BASE_URL}/product/category`, "")
}

export const getProductFunc = async (header) => {
    return await commonrequest("GET", `${BASE_URL}/product`, header)
}


export const getProductFuncPub = async () => {
    return await commonrequest("GET", `${BASE_URL}/common/product`, "")
}

export const orderPlaced = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/common/createorder`, data)
}

export const getOrders = async () => {
    return await commonrequest("GET", `${BASE_URL}/product/orders`, "")
}
export const getOrderDetails = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/product/orderDetails/${id}`, "")
}
export const completeOrderAPI = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/product/completeOrder/${id}`, "")
}
export const bookingPlaced = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/product/createbooking`, data)
}
export const setrate = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/product/setrate`, data)
}

export const booking = async (data) => {
    return await commonrequest("GET", `${BASE_URL}/product/booking`, data)
}

export const getrate = async (data) => {
    return await commonrequest("GET", `${BASE_URL}/product/getrate`, data)
}

export const updateStatus = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/product/completebooking/${id}`, "")
}