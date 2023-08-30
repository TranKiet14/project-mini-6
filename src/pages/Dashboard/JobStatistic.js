/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { getJobByIdCompany } from "../../services/jobService"
import { getCookie } from "../../helpers/cookie"
function JobStatistic() {
    const [data, setData] = useState([])
    const id = getCookie("id");
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getJobByIdCompany(id);
            if(res) {
                let obj = {
                    total: 0,
                    statustrue: 0,
                    statusfalse: 0
                }
                obj.total = res.length;
                res.forEach(item => {
                    item.status ? obj.statustrue++ : obj.statusfalse++;
                })
                setData(obj);
            }
        }
        fetchApi()
    }, [])
    return(
        <>
            <p>Số lượng job: <strong>{data.total}</strong></p>
            <p>Job đang bật: <strong>{data.statustrue}</strong></p>
            <p>Job đang tắt: <strong>{data.statusfalse}</strong></p>
        </>
    )
}
export default JobStatistic