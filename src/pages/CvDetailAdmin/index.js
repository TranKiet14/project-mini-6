/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Tag } from "antd"
import GoBack from "../../components/GoBack"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { changeStatusCv, getCv } from "../../services/cvService"
import { getJob } from "../../services/jobService"
function CvDetailAdmin() {
    const params = useParams()
    const [data, setData] = useState([]);
    const [job, setJob] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const resCv = await getCv(params.id)
            if (resCv) {
                setData(resCv);
                const resJob = await getJob(resCv.idJob);
                if (resJob) setJob(resJob);
            }
            changeStatusCv(params.id, {
                statusRead: true
            });
        }
        fetchApi()
    }, [])
    return (
        <>
            <GoBack />
            {data && (
                <Card size="small" title={`Ứng viên: ${data.name}`}>
                    <p>Ngày gửi: <strong>{data.createAt}</strong></p>
                    <p>Số điện thoại: <strong>{data.phone}</strong></p>
                    <p>Email: <strong>{data.email}</strong></p>
                    <p>Thành phố ứng tuyển: <strong>{data.city}</strong></p>
                    <p>Giới thiệu bản thân: </p>
                    <p>{data.description}</p>
                    <p>Link project: </p>
                    <p>{data.linkProject}</p>
                </Card>
            )}
            {job && (
                <Card size="small" title={`Thông tin job: ${job.name}`}>
                    <p>Tags: {(job.tags || []).map((item, index) => (
                        <Tag key={index} color="blue">{item}</Tag>
                    ))}
                    </p>
                    <p>Mức lương: <strong>{job.salary}$</strong></p>
                    <p>Mô tả: </p>
                    <p>{job.description}$</p>
                </Card>
            )}
        </>
    )
}
export default CvDetailAdmin