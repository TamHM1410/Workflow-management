import { useState, useEffect } from 'react';
import { Table } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { getProjectState } from '../../../../redux/feature/ProjectState/totalProjectSlice';
import { processingProjectState } from '../../../../redux/feature/ProjectState/processingProject';
import { priorityOneState } from '../../../../redux/feature/ProjectState/priorityOne';
import { priorityTwoState } from '../../../../redux/feature/ProjectState/priorityTwo';
import { priorityZeroState } from '../../../../redux/feature/ProjectState/priorityZero';
import { projectSevenState } from '../../../../redux/feature/ProjectState/projectInSeven';
interface types {
    Id: number,
    Name: string,
    Payment: number,
    TimeStart: string,
    TimeEnd: string,
    Note: string,
    Priority: number
}
const TableProject = () => {
    const project = useSelector((state) => state.getAllProjectReducer)
    const dispatch = useDispatch()
    const [clone, setClone] = useState<types[]>()
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const data: types[] = clone?.map((item) => {
        return {
            Id: item.Id,
            Name: item.Name,
            Payment: item.Payment,
            TimeStart: item.TimeStart,
            TimeEnd: item.TimeEnd,
            Note: item.Note,
            Priority: item.Priority
        }
    })
    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Perform any additional logic, such as fetching data for the new page
    };
    const getProject = async () => {
        const today = new Date()
        const theNextSevenDay = new Date();
        theNextSevenDay.setDate(theNextSevenDay.getDate() + 7);


        const process = project.filter((item) => today.getTime() <= Date.parse(item.TimeEnd))
        const zero = project.filter((item) => item.Priority === 0)
        const one = project.filter((item) => item.Priority === 1)
        const two = project.filter((item) => item.Priority === 2)
        const seven = project.filter((item) => today.getTime() <= Date.parse(item.TimeStart) && Date.parse(item.TimeStart) <= theNextSevenDay.getTime())

        setLoading(false)
        dispatch(processingProjectState(process))
        dispatch(priorityOneState(one))
        dispatch(priorityTwoState(two))
        dispatch(priorityZeroState(zero))
        dispatch(getProjectState(project))
        dispatch(projectSevenState(seven))


        setClone(project)

    }
    useEffect(() => {
        getProject()
    }, [])


    return (<>
        <Table columns={[
            {
                title: 'Name',
                dataIndex: 'Name'
            },
            {
                title: 'Payment',
                dataIndex: 'Payment'
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
                title: 'Note',
                dataIndex: 'Note'
            },
            {
                title: 'Priority',
                dataIndex: 'Priority'
            }
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
export default TableProject