/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { getListJobs } from "../../services/jobService"
import { Tag } from "antd";
import SearchList from "../SearchList";
import GoBack from "../../components/GoBack";

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const citySearch = searchParams.get("city") || "";
    const keywordSearch = searchParams.get("keywords") || "";
    const [data, setData] = useState([]);
    const check = (arr = [], str) => {
        return arr.some(item => item.toLowerCase().includes(str.toLowerCase()))
    }
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListJobs();
            if (res) {
                const newData = res.filter(item => {
                    const city = citySearch ? item.city?.includes(citySearch) : true;
                    const keyword = keywordSearch ? check(item.tags, keywordSearch) : true;
                    const status = item.status;
                    return city && keyword && status;
                })
                setData(newData.reverse());
            }
        }
        fetchApi();
    }, [])
    return (
        <>
            <p><GoBack /></p>
            <div><strong>Kết quả tìm kiếm: </strong>
                {citySearch && <Tag>{citySearch}</Tag>}
                {keywordSearch && <Tag>{keywordSearch}</Tag>}
            </div>
            <br></br>
            {data.length > 0 ? (<SearchList data={data}/> ) : (
                <p>Không tìm thấy công việc nào</p>
            )}
        </>
    )
}
export default Search