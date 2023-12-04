
import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getUserState } from "../../../../redux/feature/UserState/getAllUser";
import { getRoleAdminState } from "../../../../redux/feature/UserState/getRoleAdmin";
import { getRoleUserState } from "../../../../redux/feature/UserState/getRoleUser";
interface types {
    Email: string,
    Name: string,
    Role: number
}
const TableUser = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.getAllUserReducer)
    const [clone, setClone] = useState<types[]>()
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const data: types[] = clone?.map((item) => {
        return {
            Email: item.Email,
            Name: item.Name,
            Role: item.Role
        }
    })
    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Perform any additional logic, such as fetching data for the new page
    };
    const getUser = async () => {

        const admin = user.filter((item) => item.Role === 1)
        const cloneUser = user.filter((item) => item.Role === 0)
        dispatch(getUserState(user))
        dispatch(getRoleAdminState(admin))
        dispatch(getRoleUserState(cloneUser))

        setClone(user)
        setLoading(false)
    }
    useEffect(() => {
        getUser()

    }, [])
    return (<>
        <Table columns={[
            {
                title: 'Email',
                dataIndex: 'Email'
            },
            {
                title: 'Name',
                dataIndex: 'Name'
            },
            {
                title: 'Role',
                dataIndex: 'Role'
            },

        ]}

            loading={loading}
            dataSource={data}
            pagination={{
                current: currentPage,
                pageSize: 5,
                onChange: handlePageChange,


            }}


        >



        </Table>





    </>)

}
export default TableUser