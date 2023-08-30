import { useEffect, useState } from "react"
import { getCookie } from "../../helpers/cookie"
import { getCompany } from "../../services/companyService";
function InfoCompany() {
    const [data, setData] = useState([])
    const id = getCookie("id");
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getCompany(id);
            if(res) {
                setData(res);
            }
        }
        fetchApi()
    }, [])
    return(
        <>
            <p>Tên công ty: <strong>{data.companyName}</strong></p>
            <p>Email: <strong>{data.email}</strong></p>
            <p>Số điện thoại: <strong>{data.phone}</strong></p>
            <p>Số nhân viên: <strong>{data.quantityPeople}</strong></p>
        </>
    )
}
export default InfoCompany