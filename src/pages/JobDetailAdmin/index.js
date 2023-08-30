import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getJob } from "../../services/jobService";
import GoBack from "../../components/GoBack"
import { Tag } from "antd";

function JobDetailAdmin(){
    const params = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            const res= await getJob(params.id);
            setData(res);
        }
        fetchApi()
    }, [])
    return (
        <>
            <GoBack />
            {data && (
                <>
                    <h1>Tên job: {data.name}</h1>
                    <p>Trạng thái: {data.status ? (
                        <Tag color="green">Đang bật</Tag>
                    ) : (
                        <Tag color="red">Đang tắt</Tag>
                    )}</p>
                    <p>Tags: {data.tags.map((item,index) => (
                        <Tag color="blue" key={index}>{item}</Tag>
                    ))}</p>
                    <p>Mức lương: <strong>{data.salary}$</strong></p>
                    <p>Ngày tạo: <strong>{data.createAt}$</strong></p>
                    <p>Cập nhật: <strong>{data.updateAt}$</strong></p>
                    <p>Thành phố: {data.city.map((item,index) => (
                        <Tag color="orange" key={index}>{item}</Tag>
                    ))}</p>
                    <p>Mô tả:</p>
                    <p>{data.description}</p>
                </>
            )}
        </>
    )
}
export default JobDetailAdmin