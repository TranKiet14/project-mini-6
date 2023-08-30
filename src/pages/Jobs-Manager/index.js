/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import TableJob from "./TableJob"
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getJobByIdCompany } from "../../services/jobService";
function JobsManager() {
    const idCompany = getCookie("id");
    const [jobs, setJobs] = useState([]);
    const [spinning, setSpinning] = useState(false);
    const fetchApi = async () => {
        const res = await getJobByIdCompany(idCompany)
        setJobs(res)
    }
    useEffect(() => {
        fetchApi()
    }, [])
    const handleReload = () => {
        fetchApi()
    }
    return (
        <>
            <h1>Danh sách việc làm</h1>
            <Link to="/create-job">
                <Button icon={<PlusOutlined />}>Tạo việc mới</Button>
            </Link>
            <TableJob jobs = {jobs} onReload = {handleReload} />
        </>
    )
}
export default JobsManager