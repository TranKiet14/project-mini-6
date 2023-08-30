import { Button, Card, Col, Form, Input, Row, Spin, notification } from "antd"
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie"
import { getCompany, updateInfoCompany } from "../../services/companyService";
import './InfoCompany.scss'
const { TextArea } = Input;
function FormCompany() {
    const id = getCookie("id");
    const [form] = Form.useForm()
    const [disable, setDisable] = useState(true)
    const [messageApi, contextHolder] = notification.useNotification()
    const [info, setInfor] = useState();
    const [loading, setLoading] = useState(false)
    const fetchApi = async () => {
        const res = await getCompany(id);
        if (res) {
            setInfor(res);
        }
    }
    useEffect(() => {
        fetchApi()
    }, [])
    const rules = [
        {
            required: true,
            message: "Bắt buộc"
        }
    ]
    const handleFinish = async (values) => {
        setLoading(true);
        const res = await updateInfoCompany(id, values);
        if (res) {
            setLoading(false)
            messageApi.success(
                {
                    message: "Cập nhật thành công",
                    description: "Đã cập nhật, vui lòng kiểm tra thông tin"
                }
            )
            fetchApi();
            setDisable(true)
        }
        else{
            setLoading(false);
            messageApi.error(
                {
                    message: "Cập nhật không thành công",
                    description: "Vui lòng thử lại"
                }
            )
        }
    }
    const handleCancle = () => {
        setDisable(true)
        form.resetFields();
    }
    return (
        <>
        {contextHolder}
            <Card title={<>
                <div className="info-title">
                    <h3>Thông tin công ty</h3>
                    {disable ? <Button onClick={() => { setDisable(false) }}>Chỉnh sửa</Button> : <Button className="info__cancle" onClick={handleCancle}>Hủy</Button>}
                </div>
            </>}>
                {info && (
                    <Spin spinning={loading}>
                        <Form layout="vertical" form={form} initialValues={info} disabled={disable} onFinish={handleFinish}>
                            <Row gutter={[20, 10]}>
                                <Col span={24}>
                                    <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Email" name="email" rules={rules}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8} >
                                    <Form.Item label="Số điện thoại" name="phone">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Địa chỉ" name="address">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Số lượng nhân sự" name="quantityPeople">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Thời gian làm việc" name="workingTime">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Link website" name="website">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Mô tả ngắn" name="description">
                                        <TextArea rows={6} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Mô tả chi tiết" name="detail">
                                        <TextArea rows={16} />
                                    </Form.Item>
                                </Col>
                                {!disable && (
                                    <Col span={24}>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">Cập nhật</Button>
                                            <Button className="info__cancle" onClick={handleCancle}>Hủy</Button>
                                        </Form.Item>
                                    </Col>
                                )}

                            </Row>
                        </Form>
                    </Spin>
                )}
            </Card>


        </>
    )
}
export default FormCompany