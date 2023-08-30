import { Button, Card, Col, Form, Input, Row, Spin } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { login } from "../../services/companyService";
import useMessage from "antd/es/message/useMessage";
import { setCookie } from '../../helpers/cookie'
import { useDispatch } from "react-redux"
import { checkLogin } from "../../actions/login"

function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = useMessage();
    const handleFinish = async (values) => {
        setLoading(true);
        const res = await login(values.email, values.password)
        if(res.length > 0){
            const time = 1;
            setCookie("id", res[0].id, time)
            setCookie("companyName", res[0].companyName, time)
            setCookie("email", res[0].email, time)
            setCookie("token", res[0].token, time)
            dispatch(checkLogin(true));
            setLoading(false);
            navigate("/");
        } else {
            setLoading(false);
            messageApi.error(
                "Tài khoản hoặc mật khẩu không chính xác"
            )
        }
    }
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
    return (
        <>
        {contextHolder}
          <Spin spinning={loading}>
                <Row justify={"center"} gutter={[20, 20]}>
                    <Col span={8} >
                        <Card title="Đăng Nhập">
                            <Form layout='vertical' onFinish={handleFinish}>
                                <Form.Item label="Email" name="email" rules={[...rules, ...email]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Mật khẩu" name="password" rules={rules}>
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit'>Đăng nhập</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Spin>
        </>
    )
}
export default Login