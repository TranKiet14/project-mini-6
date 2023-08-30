import { Menu } from "antd"
import { DashboardOutlined, UserOutlined, UnorderedListOutlined, FileDoneOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
function MenuSider() {
    const items = [
        {
            label: <Link to={"/admin"}>Tổng quan</Link>,
            icon: <DashboardOutlined />,
            key: "dashboard"
        },
        {
            label: <Link to={"/info-company"}>Thông tin công ty</Link>,
            icon: <UserOutlined />,
            key: "info-company"
        },
        {
            label: <Link to={"/jobs-manager"}>Quản lý việc làm</Link>,
            icon: <UnorderedListOutlined />,
            key: "jobs-manager"
        },
        {
            label: <Link to={"/cv-manager"}>Quản lý CV</Link>,
            icon: <FileDoneOutlined />,
            key: "cv-manager"
        },
    ]
    return (
        <>
            <Menu items={items} mode="vertical" defaultSelectedKeys={["dashboard"]}>

            </Menu>
        </>
    )
}
export default MenuSider