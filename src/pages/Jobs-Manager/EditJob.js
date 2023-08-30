import { Button, Col, Form, Input, Modal, Row, Select, Spin, Switch, Tooltip, notification } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { getListTags } from "../../services/tagService"
import { getListCity } from "../../services/cityService"
import { getTimeCurrent } from "../../helpers/getTimeCurrent"
import { editJob } from "../../services/jobService"

function EditJob(props) {
    const { record, onReload } = props
    const [tags, setTags] = useState([])
    const [city, setCity] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const restags = await getListTags();
            const rescity = await getListCity();
            if(restags) setTags(restags)
            if(rescity) setCity(rescity)
        }
        fetchApi()
    }, [])
    const [form] = Form.useForm()
    const [spinning, setSpinning] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    }
    const handleCancle = () => {
        setShowModal(false);
        form.resetFields();
    }
    const [notificationApi, contextHolder] = notification.useNotification();
    const rules = [
        {
            required: true,
            message: 'Bắt buộc',
        },
    ]
    const handleFinish = async (values) => {
        values.updateAt = getTimeCurrent();
        const res = await editJob(record.id, values);
        if(res) {
            setShowModal(false)
            onReload()
            notificationApi.success({
                message: "Cập nhật thành công",
                duration: 5
            })
        } else {
            notificationApi.error({
                message: "Cập nhật không thành công",
                duration: 3
            })
        }
    }
    return (
        <>
            {contextHolder}
            <Tooltip title="Chỉnh sửa" color="blue">
                <Button ghost type="primary" size="small" onClick={handleShowModal}><EditOutlined /></Button>
            </Tooltip>
                <Modal title="Chỉnh sửa Job" open={showModal} onCancel={handleCancle} footer={null} centered width={1000}>
                <Spin spinning={spinning}>
                    <Form layout="vertical" form={form} initialValues={record} onFinish={handleFinish}>
                        <Row gutter={[20,10]}>
                            <Col span={24}>
                                <Form.Item label="Tên job" name={"name"} rules={rules}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={16}>
                                <Form.Item label="Tags" name={"tags"} rules={rules}>
                                    <Select mode="multiple" options={tags} allowClear/>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="Mức lương" name={"salary"} rules={rules}>
                                    <Input addonAfter="$"/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Thành phố" name={"city"} rules={rules}>
                                    <Select mode="multiple" options={city} allowClear/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Mô tả" name={"description"} >
                                    <Input.TextArea rows={16}/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Trạng thái" name={"status"} valuePropName="checked">
                                    <Switch checkedChildren = "Bật" unCheckedChildren="Tắt"  />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Cập nhật</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </Modal>
        </>
    )
}
export default EditJob