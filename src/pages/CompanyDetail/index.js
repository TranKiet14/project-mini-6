import { Link, useParams } from "react-router-dom"
import GoBack from "../../components/GoBack"
import { useEffect, useState } from "react";
import { getCompany } from '../../services/companyService'
import { getJobByIdCompany } from "../../services/jobService";
import { Card, Col, Row, Tag } from "antd";
function CompanyDetail() {
    const params = useParams();
    const [company, setCompany] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getCompany(parseInt(params.id));
            setCompany(res);
        }
        fetchApi()
    }, [])
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getJobByIdCompany(parseInt(params.id));
            setJobs(res);
        }
        fetchApi()
    }, [])
    return (
        <>
            <GoBack />
            {company && (
                <>
                    <h1>{company.companyName}</h1>
                    <p>Địa chỉ: <strong>{company.address}</strong></p>
                    <p>Số lượng nhân sự: <strong>{company.quantityPeople}</strong></p>
                    <p>Giờ làm việc: <strong>{company.workingTime}</strong></p>
                    <p>Link Website: <strong>{company.website}</strong></p>
                    <div>Mô tả ngắn:</div>
                    <p>{company.description}</p>
                    <div>Mô tả chi tiết:</div>
                    <p>{company.detail}</p>
                    {jobs.length > 0 ? (
                        <>
                            <Row gutter={[20, 20]}>
                                {jobs.map((item) => (
                                    <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={12} key={item.id}>
                                        <Card size="small" title={<Link to={item.status ? `/jobs/${item.id}` : "/error"}>{item.name}</Link>}>
                                            <p>Ngôn ngữ: {item.tags.map((itemTag, index) => (
                                                <Tag key={index} color="blue">{itemTag}</Tag>
                                            ))}
                                            </p>
                                            <p>Thành phố: {(item.city || []).map((itemCity, index) => (
                                                <Tag key={index} color="orange">{itemCity}</Tag>
                                            ))}
                                            </p>
                                            <p>Lương: <strong>{item.salary}$</strong> </p>
                                            <p>Ngày tạo: <strong>{item.createAt}</strong></p>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    ) : (
                        <div>Không tìm thấy công việc nào</div>
                    )}
                </>
            )}
        </>
    )
}
export default CompanyDetail