import { Col, Row, Tag } from "antd"
import { useEffect, useState } from "react"
import { getListTags } from "../../services/tagService";
import { Link } from "react-router-dom";

function SkillList() {
    const [dataTag, setDataTag] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListTags()
            setDataTag(res);
        }
        fetchApi()
    }, [])
    return (
        <>
            {dataTag.length > 0 && (
                <>
                    <Row gutter={[2, 6]} >
                        {dataTag.map(item => (
                            <Col xxl={2} key={item.key}>
                                <Link to={`/search?keywords=${item.value}`}>
                                    <Tag color="blue" >
                                        {item.value}
                                    </Tag>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    )
}
export default SkillList