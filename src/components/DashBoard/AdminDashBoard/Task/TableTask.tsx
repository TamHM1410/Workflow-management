import { useState, useEffect } from 'react';
import { Table } from 'antd';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTaskState } from '../../../../redux/feature/getTaskSlice';
import { getCompleteState } from '../../../../redux/feature/TaskState/completeTask';
import { getPedingState } from '../../../../redux/feature/TaskState/pendingTask';
import { getInprocessState } from '../../../../redux/feature/TaskState/inprocessTask';
import { getOverdueState } from '../../../../redux/feature/TaskState/overdueTask';
import { getTaskEndState } from '../../../../redux/feature/TaskState/taskEnd';

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



const TableTask = () => {
    const dispatch = useDispatch()
    const [clone, setClone] = useState<DataType[]>()
    const [loading, setLoading] = useState(true)
    const task = useSelector((state: DataType) => state.getTaskReducer)
    const data: DataType[] = clone?.map((item) => {
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
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Perform any additional logic, such as fetching data for the new page
    };





    const getTask = async () => {
        const today = new Date();
        const theNextDay = new Date();
        theNextDay.setDate(theNextDay.getDate() + 3);


        setClone(task)
        const pending = task?.filter((item: { Status: number }) => item.Status === 0)
        const inprocess = task?.filter((item: { Status: number }) => item.Status === 1)
        const complete = task?.filter((item: { Status: number }) => item.Status === 2)
        const overdue = task?.filter((item: { Status: number, prjEnd: string }) => Date.parse(item.prjEnd) < today.getTime() && item.Status === 0)
        setLoading(false)
        const theThree = task?.filter((item: { TimeEnd: string }) => today.getTime() <= Date.parse(item.TimeEnd) && Date.parse(item.TimeEnd) <= theNextDay.getTime())
        dispatch(getTaskState(task))
        dispatch(getPedingState(pending))
        dispatch(getInprocessState(inprocess))
        dispatch(getCompleteState(complete))
        dispatch(getOverdueState(overdue))
        dispatch(getTaskEndState(theThree))



    }
    useEffect(() => {
        getTask()


    }, [])




    return (<>
        <Table columns={[
            {
                title: 'UserMail',
                dataIndex: 'UserMail'
            },
            {
                title: 'ProjectId',
                dataIndex: 'ProjectId'
            },
            {
                title: 'Timestart',
                dataIndex: 'TimeEnd'
            },
            {
                title: 'Status',
                dataIndex: 'Status'
            },
            {
                title: 'Note',
                dataIndex: 'Note'
            }]}
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
export default TableTask