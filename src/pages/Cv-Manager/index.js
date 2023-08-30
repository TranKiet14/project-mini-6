import { useEffect, useState } from "react"
import { getCvByIdCompany } from "../../services/cvService";
import { getCookie } from "../../helpers/cookie"
import { Button, Table, Tag, Tooltip } from "antd"
import { Link } from "react-router-dom";
import CvJobName from "./CvJobName";
import DeleteCv from "./DeleteCv";
import { EyeOutlined } from "@ant-design/icons";
function CvManager() {
    const [data, setData] = useState();
    const idCompany = getCookie("id");
    const fetchApi = async () => {
        const res = await getCvByIdCompany(idCompany)
        setData(res.reverse())
    }
    useEffect(() => {
        fetchApi()
    }, [])
    const handleReload = () => {
        fetchApi();
    }
    const columns = [
        {
            title: "Tên job",
            dataIndex: "idJob",
            key: "idJob",
            render: (_, record) => (
                <CvJobName record={record} />
            )
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Ngày gửi",
            dataIndex: "createAt",
            key: "createAt"
        },
        {
            title: "Trạng thái",
            dataIndex: "statusRead",
            key: "statusRead",
            render: (_, record) => (
                <>
                    {record.statusRead ? (
                        <Tag color="green">Đã đọc</Tag>
                    ): (
                        <Tag color="volcano">Chưa đọc</Tag>
                    )}
                </>
            )
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <>
                    <Link to={`/detail-cv/${record.id}`}>
                        <Tooltip title="Xem chi tiết" color="cyan">
                            <Button size="small" icon={<EyeOutlined />}></Button>
                        </Tooltip>
                    </Link>
                    <DeleteCv record = {record} onReload = {handleReload} />
                </>
            )
        },
    ]
    return (
        <>
            <h1>Danh sách CV</h1>
            <Table dataSource={data} columns={columns} rowKey={"id"}></Table>
        </>
    )
}
export default CvManager