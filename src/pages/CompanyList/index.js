import { useEffect, useState } from "react"
import { getListCompany } from "../../services/companyService"
import { Button, Card, Col, Row } from "antd"
import './CompanyList.scss'
import { Link } from "react-router-dom"

function CompanyList() {
    const [dataCompany, setDataCompany] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListCompany();
            setDataCompany(res)
        }
        fetchApi()
    }, [])
    return (
        <>
            <h1>Danh sách một số công ty</h1>
            {dataCompany.length > 0 && (
                <Row gutter={[20, 20]}>
                    <>
                        {dataCompany.map((item) => (
                            <Col key={item.id} xxl={4} xl={4} lg={4} md={6} sm={12} xs={24}>
                                <Link to={`/company/${item.id}`}>
                                    <Card>
                                        <p>Công ty: <strong>{item.companyName}</strong></p>
                                        <p>Số nhân sự: <strong>{item.quantityPeople}</strong></p>
                                        <p>Địa chỉ: <strong>{item.address}</strong></p>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </>
                </Row >
            )
            }
            <Link to={"/company"}>
                <Button className="btn">Xem thêm</Button>
            </Link>
        </>
    )
}
export default CompanyList