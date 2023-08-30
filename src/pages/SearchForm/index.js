import { Button, Col, Form, Input, Row, Select } from "antd"
import { useEffect, useState } from "react"
import { getListCity } from "../../services/cityService";
import { useNavigate } from "react-router-dom"

function SearchForm() {
    const [dataCity, setDataCity] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListCity();
            const city = [
                {
                    key: 0,
                    value: "Tất cả"
                },
                ...res
            ]
            setDataCity(city)
        }
        fetchApi();
    }, [])
    const handleFinish = (values) => {
        let city = values.city || "";
        city = values.city === "Tất cả" ? "" : city
        navigate(
            `/search?city=${city}&keywords=${values.keywords || ""}`
        )
    }
    return (
        <>
            <h1>1000+ IT Jobs For Developers</h1>
            {dataCity && (
                <Form onFinish={handleFinish}>
                    <Row gutter={[12,12]}>
                        <Col xxl={6} xl={6} lg={6}>
                            <Form.Item name="city">
                                <Select options={dataCity} placeholder={"Chọn thành phố"} />
                            </Form.Item>
                        </Col>
                        <Col xxl={15} xl={15} lg={15}>
                            <Form.Item name="keywords">
                                <Input placeholder={"Nhập từ khóa"} />
                            </Form.Item>
                        </Col>
                        <Col xxl={3} xl={3} lg={3}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Tìm kiếm</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}
            
        </>
    )
}
export default SearchForm