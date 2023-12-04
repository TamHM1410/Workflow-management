

import React, { useState } from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { detailStatusState } from '../../../redux/feature/detailStatus';

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info('Click on left button.');

};



const CustomDropdown = () => {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.getDetailStatusReducer)
    const items: MenuProps['items'] = [
        {
            label: 'all',
            key: '1',
            icon: <UserOutlined />,

        },
        {
            label: 'Task',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: 'Project',
            key: '3',
            icon: <UserOutlined />,
            danger: true,
        },
        {
            label: 'User',
            key: '4',
            icon: <UserOutlined />,
            danger: true,

        },
    ];

    const navigate = useNavigate();
    const handleMenuClick: MenuProps['onClick'] = async (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
        switch (e.key) {
            case '1':
                await navigate('/dashboard');
                dispatch(detailStatusState(1))
                break;
            case '2':
                await navigate('/dashboard/task');
                dispatch(detailStatusState(2))
                break;
            case '3':
                await navigate('/dashboard/project');
                dispatch(detailStatusState(3))
                break;
            case '4':
                await navigate('/dashboard/user');
                dispatch(detailStatusState(4))
                break;
            default:
                break;
        }
    };

    const handleDetail = async (e) => {
        e.preventDefault()

        switch (status) {
            case 1:
                await navigate('/dashboard');

                break;
            case 2:
                await navigate('/task');

                break;
            case 3:
                await navigate('/project');

                break;
            case 4:
                await navigate('/edit');

                break;
            default:
                break;
        }

    }
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };


    return (<>
        <Space wrap>
            <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                Dropdown
            </Dropdown.Button>
            <Button onClick={handleDetail}>
                Detail
            </Button>

        </Space></>)

}
export default CustomDropdown