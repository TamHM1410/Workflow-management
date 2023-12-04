import { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import '../UserResponsive.css'

import { getTaskState } from '../../../../redux/feature/getTaskSlice';
import { useCookies } from 'react-cookie';
interface DataType {
    Id: number,
    UserMail: string,
    ProjectId: number,
    TimeStart: string,
    TimeEnd: string,
    Status: number,
    Note: string,
    UserName: string,
    ProjectName: string,
    prjStart: string,
    prjEnd: string



}
interface props {
    task: DataType[]
    state: boolean
    clone: DataType[]
}

const UserTasKTable = (props: props) => {
    const dispatch = useDispatch()
    const lol = useSelector((state) => state.getTaskReducer)
    const [data, setData] = useState<DataType[]>([])



    const { state, clone } = props
    const [cookies, setCookie] = useCookies(['userInfo']);


    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const getData = async () => {




        if (cookies.userInfo?.role === 0) {
            const test = clone?.filter((item: api) => cookies.userInfo.email === item.UserMail)
            const list = test.sort((a: api, b: api) => b.Id - a.Id)
            dispatch(getTaskState(list))
            const data: DataType[] = clone.map((item) => {
                return {
                    Id: item.Id,
                    UserMail: item.UserMail,
                    ProjectId: item.ProjectId,
                    TimeStart: item.TimeStart,
                    TimeEnd: item.TimeEnd,
                    Status: item.Status,
                    Note: item.Note,
                    UserName: item.UserName,
                    ProjectName: item.ProjectName,
                    prjStart: item.prjStart,
                    prjEnd: item.prjEnd

                }
            })

            setData(data)




        }
        setLoading(false)

    }







    useEffect(() => {
        getData()



    }, [state, clone])




    const handlePageChange = (page) => {
        setCurrentPage(page);

    };

    return (<>
        <Table columns={[
            {
                title: 'UserMail',
                dataIndex: 'UserMail',
                width: '10%',

            },
            {
                title: 'ProjectId',
                dataIndex: 'ProjectId',
                width: '40%'
            },
            {
                title: 'Timestart',
                dataIndex: 'TimeStart'
            },
            {
                title: 'TimeEnd',
                dataIndex: 'TimeEnd'
            },
            {
                title: 'Status',
                dataIndex: 'Status'
            },
            {
                title: 'Note',
                dataIndex: 'Note'
            },

            {
                title: 'ProjectName',
                dataIndex: 'ProjectName'
            },
            {
                title: 'prjStart',
                dataIndex: 'prjStart'
            },
            {
                title: 'prjEnd',
                dataIndex: 'prjEnd'
            },


        ]}
            dataSource={data}

            loading={loading}
            pagination={{
                current: currentPage,
                pageSize: 5,
                onChange: handlePageChange,


            }}




        >



        </Table>





    </>)


}
export default UserTasKTable