import React from 'react';
import { Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { useState } from 'react'
import cloneDeep from 'lodash/cloneDeep';

interface api {
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
    listTask: api[] | undefined
    setListTask: (value: api[] | undefined) => void
    cloneList: api[] | undefined
}
const CustomDropdown = (props: props) => {
    const { listTask, setListTask, cloneList } = props



    const handlePendingTask = async () => {
        const data = cloneList?.filter((item) => item.Status === 0)


        setListTask(data)


    }
    const handleInProcessTask = async () => {
        const data = cloneList?.filter((item) => item.Status === 1)



        setListTask(data)


    }
    const handleCompleteTask = async () => {
        const data = cloneList?.filter((item) => item.Status === 2)



        setListTask(data)


    }
    const handleNext3Days = async () => {
        const today = new Date();
        const theNextDay = new Date();
        theNextDay.setDate(theNextDay.getDate() + 3);



        const data = cloneList?.filter((item) => today.getTime() <= Date.parse(item.TimeEnd) && Date.parse(item.TimeEnd) <= theNextDay.getTime());

        setListTask(data)

    };
    const handleOverdueTask = () => {
        const today = new Date();


        const data = cloneList?.filter((item) => Date.parse(item.prjEnd) < today.getTime() && item.Status === 0)
        setListTask(data)


    }
    const handleGetAll = () => {
        setListTask(cloneList)
    }



    return (
        <>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Filter
                </Dropdown.Toggle>



                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleGetAll}>Get All</Dropdown.Item>

                    <Dropdown.Item onClick={handleOverdueTask}>Overdue task</Dropdown.Item>

                    <Dropdown.Item onClick={handlePendingTask}>Pending Task</Dropdown.Item>
                    <Dropdown.Item onClick={handleInProcessTask}>In-Process Task</Dropdown.Item>
                    <Dropdown.Item onClick={handleCompleteTask} >Complete Task </Dropdown.Item>
                    <Dropdown.Item onClick={handleNext3Days}> Tasks will need to be completed in the next 3 days</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

export default CustomDropdown;