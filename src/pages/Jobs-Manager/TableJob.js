import { Button, Table, Tag, Tooltip } from "antd";
import DeleteJob from "./DeleteJob";
import { EyeOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import EditJob from "./EditJob";

function TableJob(props) {
    const { jobs, onReload } = props
    const columns = [
        {
            title: "Tên job",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (_, record) =>
                (record.tags || []).map((item, index) => (
                    <Tag color="blue" key={index}>{item}</Tag>
                ))
        },
        {
            title: "Mức lương",
            dataIndex: "salary",
            key: "salary"
        },
        {
            title: "Thời gian",
            key: "time",
            render: (_, record) => (
                <>
                    <small>Ngày tạo: <strong>{record.createAt}</strong></small>
                    <br></br>
                    <small>Ngày cập nhật: <strong>{record.updateAt}</strong></small>
                </>
            )
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <>
                    {record.status ? (
                        <Tag color="green">Đang bật</Tag>
                    ) : (
                        <Tag color="red">Đang tắt</Tag>
                    )}
                </>
            )
        }
        ,
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <>
                    <Link to={`/detail-job/${record.id}`}>
                        <Tooltip title="Xem chi tiết" color="cyan">
                            <Button size="small" icon={<EyeOutlined />}></Button>
                        </Tooltip>
                    </Link>
                    <EditJob record={record} onReload={onReload}/>
                    <DeleteJob record={record} onReload={onReload} />
                </>
            )
        }
    ]
    return (
        <>
            <Table dataSource={jobs} columns={columns} rowKey={"id"} />
        </>
    )
}
export default TableJob