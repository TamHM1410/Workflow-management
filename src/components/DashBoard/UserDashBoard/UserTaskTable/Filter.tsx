

import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Dropdown, message, Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';


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


const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info('Click on left button.');

};
interface props {
    clone: DataType[]
    setClone: (value: DataType[]) => void
    clone1: DataType[]

}



const AddFilter = (props: props) => {

    const { setClone, clone1 } = props

    const handleInprocessTask = () => {
        const data = clone1.filter((item) => item.Status === 1 || item.Status === 0)

        setClone(data)




    }
    const handleInprocessProject = () => {
        const today = new Date()

        const data = clone1.filter((item) => Date.parse(item.prjStart) <= today.getTime() && today.getTime() <= Date.parse(item.prjEnd))
        setClone(data)


    }
    const handleCompleteIn7days = () => {
        const today = new Date()
        const theNext = new Date()
        theNext.setDate(theNext.getTime() + 7)
        const data = clone1.filter((item) => today.getTime() <= Date.parse(item.TimeEnd) && Date.parse(item.TimeEnd) <= theNext.getTime())
        setClone(data)
    }
    const handleGetAll = () => {
        setClone(clone1)
    }
    const items: MenuProps['items'] = [
        {
            label: 'All',
            key: '1',
            icon: <UserOutlined />,

        },
        {
            label: 'Task must be completed in the next 7 days',
            key: '2',
            icon: <UserOutlined />,
            danger: true
        },
        {
            label: 'In-Process Project',
            key: '3',
            icon: <UserOutlined />,
            danger: false
        },
        {
            label: 'In-Process Task',
            key: '4',
            icon: <UserOutlined />,
            danger: false,

        }
    ];

    const navigate = useNavigate();
    const handleDetail = () => {
        navigate('/task')
    }
    const handleMenuClick: MenuProps['onClick'] = async (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
        switch (e.key) {
            case '1':
                handleGetAll();

                break;
            case '2':
                handleCompleteIn7days()


                break;
            case '3':
                handleInprocessProject()


                break;
            case '4':
                handleInprocessTask();

                break;

            default:
                break;
        }
    };


    const menuProps = {
        items,
        onClick: handleMenuClick,
    };


    return (<>
        <Space wrap>
            <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                Add Filter <PlusCircleOutlined />
            </Dropdown.Button>
            <Button onClick={handleDetail}> Detail</Button>


        </Space></>)

}
export default AddFilter