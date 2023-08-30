import { del, get, patch, post } from "../utils/request"
export const getListCv = async () => {
    const result = await get("cv")
    return result
}
export const createCv = async (option) => {
    const result = await post("cv", option)
    return result
}
export const getCvByIdCompany = async (id) => {
    const result = await get(`cv?idCompany=${id}`)
    return result
}
export const deleteCv = async (id) => {
    const result = await del(`cv/${id}`)
    return result
}
export const getCv = async (id) => {
    const result = await get(`cv/${id}`)
    return result
}
export const changeStatusCv = async (id,options) => {
    const result = await patch(`cv/${id}`, options)
    return result
}