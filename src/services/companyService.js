import { get, patch, post } from "../utils/request"
export const getListCompany = async () => {
    const result = await get("company")
    return result
}
export const getCompany = async (id) => {
    const result = await get(`company/${id}`)
    return result
}
export const createCompany = async (options) => {
    const result = await post(`company`, options)
    return result
}
export const checkExist = async (type,value) => {
    const result = await get(`company?${type} = ${value}`)
    return result
}
export const login = async (email, password) => {
    const result = await get(`company?email=${email}&password=${password} `);
    return result
}
export const updateInfoCompany = async (id,options) => {
    const result = await patch(`company/${id}`, options)
    return result
}