import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getJob } from "../../services/jobService";
import GoBack from "../../components/GoBack";
import { getCompany } from "../../services/companyService";
import { Button, Card, Col, Form, Input, Row, Select, Spin, Tag, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { getListCity } from "../../services/cityService"
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
import { createCv } from "../../services/cvService"


function JobDetail() {
    const params = useParams();
    const [form] = useForm();
    const [city, setCity] = useState([]);
    const [api, contextHolder] = notification.useNotification()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListCity();
            setCity(res);
        }
        fetchApi()
    }, [])
    const rules = [
        {
            required: true,
            message: "Bắt Buộc"
        }
    ]
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getJob(parseInt(params.id));
            const company = await getCompany(parseInt(res.idCompany));
            const newData = {
                addressCompany: company.address,
                descriptionCompany: company.description,
                ...res
            }
            setData(newData)
        }
        fetchApi()
    }, [])
    const handleFinish = async (values) => {
        values.idJob = data.id;
        values.idCompany = parseInt(data.idCompany);
        values.createAt = getTimeCurrent();
        setLoading(true)
        const res = await createCv(values);
        if (res) {
            setLoading(false);
            form.resetFields();
            api.success({
                message: "Gửi yêu cầu thành công",
                description: "Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất."
            })
        }
        else{
            setLoading(false);
            api.error({
                message: "Gửi yêu cầu không thành công",
                description: "Hệ thống đang gặp lỗi, xin vui lòng gửi lại yêu cầu."
            })
        }
    }
    return (
        <>
            {contextHolder}
            <GoBack />
            {data && (
                <>
                    <h1>{data.name}</h1>
                    <Button href="#formApply" size="large" type="primary">ỨNG TUYỂN NGAY</Button>
                    <p>Tags: {(data.tags || []).map((item, index) => (
                        <Tag color="blue" key={index}>{item}</Tag>
                    ))}
                    </p>
                    <p>Thành phố: {(data.city || []).map((item, index) => (
                        <Tag color="orange" key={index}>{item}</Tag>
                    ))}
                    </p>
                    <p>Mức lương: <strong>{data.salary}$</strong></p>
                    <p>Địa chỉ công ty: <strong>{data.addressCompany}</strong></p>
                    <p>Thời gian đăng bài: <strong>{data.createAt}</strong> </p>
                    <div>Mô tả công việc: </div>
                    <p>{data.description}</p>
                    <div>Giới thiệu công ty: </div>
                    <p>{data.descriptionCompany}</p>
                    <Card id="formApply" title="Ứng tuyển ngay">
                        <Spin spinning={loading} size="large" tip="Đang gửi...">
                            <Form form={form} layout="vertical" onFinish={handleFinish}>
                                <Row gutter={[20, 20]}>
                                    <Col span={6}>
                                        <Form.Item label="Họ tên:" name="name" rules={rules}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="Số điện thoại:" name="phone" rules={rules}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="Email:" name="email" rules={rules}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="Thành phố:" name="city" rules={rules}>
                                            <Select options={city} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item label="Giới thiệu bản thân:" name="description" rules={rules}>
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item label="Danh sách các Project đã làm:" name="linkProject" rules={rules}>
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Gửi yêu cầu</Button>
                                </Form.Item>
                            </Form>
                        </Spin>
                    </Card>
                </>
            )}
        </>
    )
}
export default JobDetail