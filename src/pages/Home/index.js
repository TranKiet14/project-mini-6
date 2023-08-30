import CompanyList from "../CompanyList"
import SearchForm from "../SearchForm"
import SkillList from "../SkillList"


function Home() {
    
    return (
        <>
            <SearchForm />
            <SkillList />
            <CompanyList />
        </>
    )
}
export default Home