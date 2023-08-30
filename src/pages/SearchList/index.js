/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Tag } from "antd"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListCompany } from "../../services/companyService";


function SearchList(props) {
    const { data = [] } = props;
    const [dataFinal, setDataFinal] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const company = await getListCompany()
            const newData = data.map((item) => {
                const infoCompany = company.find((itemCompany) => itemCompany.id == item.idCompany && itemCompany);
                return {
                    infoCompany: infoCompany,
                    ...item,
                };
            });
            setDataFinal(newData);
        }
        fetchApi()
    }, [])
    return (
        <>
            {dataFinal.length > 0 ? (
                <>
                    <Row gutter={[20, 20]}>
                        {dataFinal.map((item) => (
                            <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={12} key={item.id}>
                                <Card size="small" title={<Link to={`/jobs/${item.id}`}>{item.name}</Link>}>
                                    <p>Ngôn ngữ: {item.tags.map((itemTag, index) => (
                                        <Tag key={index} color="blue">{itemTag}</Tag>
                                    ))}
                                    </p>
                                    <p>Thành phố: {(item.city || []).map((itemCity, index) => (
                                        <Tag key={index} color="orange">{itemCity}</Tag>
                                    ))}
                                    </p>
                                    <p>Tên công ty: <strong>{item.infoCompany.companyName}</strong></p>
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
    )
}
export default SearchList