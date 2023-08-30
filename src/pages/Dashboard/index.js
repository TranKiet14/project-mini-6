import { Card, Col, Row } from 'antd';
import JobStatistic from './JobStatistic';
import CvStatistic from './CvStatistic';
import InfoCompany from './infocompany';
function Dashboard() {
    return (
        <>
            <h2>Tổng quan</h2>
            <Row gutter={[20, 20]}>
                <Col span={8}>
                    <Card title={"Thông tin công ty"}>
                        <InfoCompany />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title={"Job"}>
                        <JobStatistic />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title={"Cv"}>
                        <CvStatistic />
                    </Card>
                </Col>
            </Row>
        </>
    )
}
export default Dashboard