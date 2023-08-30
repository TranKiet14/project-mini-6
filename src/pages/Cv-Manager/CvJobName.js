import { useEffect, useState } from "react";
import { getJob } from "../../services/jobService";

function CvJobName(props) {
    const { record } = props;
    const [job,setJob] = useState([]);
    useEffect(() => {
        const fetchApi = async() => {
            const res= await getJob(record.idJob)
            setJob(res);
        }
        fetchApi()
    }, [])
    return (
        <>
            {job.name}
        </>
    )
}
export default CvJobName