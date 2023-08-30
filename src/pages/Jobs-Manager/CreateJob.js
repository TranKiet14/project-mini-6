import { Button, Col, Form, Input, Row, Select, Spin, Switch, message } from "antd"
import GoBack from "../../components/GoBack"
import { useEffect, useState } from "react"
import { getListTags } from "../../services/tagService"
import { getListCity } from "../../services/cityService"
import { getCookie } from "../../helpers/cookie"
import { getTimeCurrent } from "../../helpers/getTimeCurrent"
import { createJob } from "../../services/jobService"
function CreateJob() {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const id = getCookie("id");
    const rules = [
        {
            required: true,
            message: "Không được để trống"
        }
    ]
    const [tags, setTags] = useState([]);
    const [city, setCity] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListTags();
            if (res) {
                setTags(res);
            }
        }
        fetchApi()
    }, [])
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListCity();
            if (res) {
                setCity(res);
            }
        }
        fetchApi()
    }, [])
    const handleFinish = async (values) => {
        setLoading(true)
        values.idCompany = parseInt(id);
        values.createAt = getTimeCurrent();
        const res = await createJob(values);
        if (res) {
            setLoading(false);
            messageApi.success("Thêm công việc mới thành công")
            form.resetFields()
        }
        else {
            setLoading(false);
            messageApi.error("Thêm thất bại")
        }
    }
    return (
        <>
            {contextHolder}
            <GoBack />
            <h1>Tạo job mới</h1>
            <Spin spinning={loading}>
                <Form layout="vertical" onFinish={handleFinish} form={form}>
                    <Row gutter={[20, 10]}>
                        <Col span={24}>
                            <Form.Item label="Tên job" name="name" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            {tags.length > 0 && (
                                <Form.Item label="Tags" name="tags" rules={rules}>
                                    <Select options={tags} mode="multiple" allowClear />
                                </Form.Item>
                            )}
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Mức lương" name="salary" rules={rules}>
                                <Input addonAfter="$" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            {city.length > 0 && (
                                <Form.Item label="Thành phố" name="city" rules={rules}>
                                    <Select options={city} mode="multiple" allowClear />
                                </Form.Item>
                            )}
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Mô tả" name="description">
                                <Input.TextArea rows={16} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Trạng thái" name="status" valuePropName="checked">
                                <Switch checkedChildren="On" unCheckedChildren="Off"/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Tạo mới</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        </>
    )
}
export default CreateJob