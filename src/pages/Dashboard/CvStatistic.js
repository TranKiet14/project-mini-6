import { useEffect, useState } from "react"
import { getCvByIdCompany } from "../../services/cvService";
import { getCookie } from "../../helpers/cookie";

function CvStatistic() {
    const id = getCookie("id")
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi =  async () => {
            const res = await getCvByIdCompany(id);
            if(res){
                let obj = {
                    total: 0,
                    statustrue: 0,
                    statusfalse: 0
                }
                obj.total = res.length
                res.forEach(item => {
                    item.statusRead ? obj.statustrue++ : obj.statusfalse++
                })
                setData(obj)
            }
        }
        fetchApi()
    }, [])
    return(
        <>
            <p>Số lượng CV: <strong>{data.total}</strong></p>
            <p>CV chưa đọc: <strong>{data.statusfalse}</strong></p>
            <p>CV đã đọc: <strong>{data.statustrue}</strong></p>
        </>
    )
}
export default CvStatistic