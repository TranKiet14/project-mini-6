import { Button, Card, Col, Form, Input, Row, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { generateToken } from '../../helpers/generateToken'
import { checkExist, createCompany } from '../../services/companyService';
import useMessage from 'antd/es/message/useMessage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
    const [form] = useForm();
    const [messageApi, contextHolder] = useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const rules = [
        {
            required: true,
            message: "Vui lòng không để trống mục này"
        }
    ]
    const email = [
        {
            type: 'email',
            message: "Vui lòng nhập đúng email"
        }
    ]
    const handleFinish = async (values) => {
        setLoading(true)
        values.token = generateToken();
        const checkExistEmail = await checkExist("email", values.email)
        const checkExistPhone = await checkExist("phone", values.phone)
        if (checkExistEmail.length > 0) {
            setLoading(false);
            messageApi.open({
                type: "error",
                content: "Email này đã tồn tại"
            })
        } else if (checkExistPhone.length > 0) {
            setLoading(false);
            messageApi.open({
                type: "error",
                content: "Số điện thoại này đã tồn tại"
            })
        }
        else {
            const res = await createCompany(values);
            if(res){
                setLoading(false);
                navigate("/login");
            }
        }

    }
    return (
        <>
            {contextHolder}
            <Spin spinning={loading}>
                <Row justify={'center'} gutter={[20, 20]}>
                    <Col span={8}>
                        <Card title="Đăng ký tài khoản">
                            <Form layout='vertical' form={form} onFinish={handleFinish}>
                                <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Email" name="email" rules={[...rules, ...email]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Mật khẩu" name="password" rules={rules}>
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit'>Đăng ký</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Spin>

        </>
    )
}
export default Register