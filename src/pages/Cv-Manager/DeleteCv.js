import { Button, Popconfirm, notification } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { deleteCv } from "../../services/cvService";

function DeleteCv(props) {
    const { onReload, record } = props;
    const [messageApi, contextHolder] = notification.useNotification();
    const handleDelete = async () => {
        const res = deleteCv(record.id)
        if(res) {
            onReload();
        } else {
            messageApi.error(
                {
                    message: "Xóa Thất bại",
                    duration: 3
                }
            )
        }
    }
    return (
        <>
            {contextHolder}
            <Popconfirm title="Bạn có muốn xóa hay không" onConfirm={handleDelete}>
                <Button danger size="small" icon={<DeleteOutlined />}  />
            </Popconfirm>
        </>
    )
}
export default DeleteCv