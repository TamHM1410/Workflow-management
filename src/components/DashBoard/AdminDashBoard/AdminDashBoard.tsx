import React, { useState, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Card, Space, Typography, Statistic } from 'antd';
import CustomDropdown from './Dropdown';
import MainChart from './MainChart';

import { getAllTask, getAllProject, getAllUser } from '../../../service/UserService';
import { useCookies } from 'react-cookie';
import './Responsive.css'

import { useSelector, useDispatch } from 'react-redux';
import { getTaskState } from '../../../redux/feature/getTaskSlice';
import { getUserState } from '../../../redux/feature/UserState/getAllUser';
import { getProjectState } from '../../../redux/feature/ProjectState/totalProjectSlice';
import { ArrowRightOutlined, UserOutlined, YuqueOutlined, SlackSquareOutlined } from '@ant-design/icons';








const { Content, Sider } = Layout;
const option = ['DashBoard', 'Calculator', 'Notification']



const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);
        const name = option[index]


        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: ` ${name}`,


        };
    },
);


const AdminDashBoard: React.FC = () => {


    const dispatch = useDispatch()
    const [selectedOptionKey, setSelectedOptionKey] = useState('');
    const [cookies, setCookie] = useCookies(['checked']);

    const user = useSelector((state) => state.getAllUserReducer)
    const project = useSelector((state) => state.getAllProjectReducer)
    const task = useSelector((state) => state.getTaskReducer)


    const getData = async () => {
        const res1 = await getAllUser()
        const res2 = await getAllProject()
        const res3 = await getAllTask()
        dispatch(getUserState(res1.data))
        dispatch(getTaskState(res3.data))
        dispatch(getProjectState(res2.data))
        setCookie('checked', { checked: true })





    }


    const handleOptionClick = (key: string) => {
        setSelectedOptionKey(key);
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {

        getData()

    }, [])


    return (
        <Layout>

            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }} className='body'>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items2}
                        onClick={({ key }) => handleOptionClick(key)}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }} >
                    <Breadcrumb style={{ margin: '16px 0' }}>

                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Typography.Title level={4}>
                            <Space className='block'>
                                <Space direction='horizontal'>
                                    <Card >
                                        <Space >
                                            <YuqueOutlined style={{ marginBottom: '44px' }} />


                                            <Statistic title='Total Project ' value={project.length} />
                                        </Space>


                                    </Card>
                                    <ArrowRightOutlined />
                                </Space>
                                <Card>
                                    <Space>

                                        <SlackSquareOutlined style={{ marginBottom: '44px' }} />

                                        <Statistic title='Total Task ' value={task.length} />
                                    </Space>


                                </Card>
                                <ArrowRightOutlined />
                                <Card >
                                    <Space>
                                        <UserOutlined style={{ marginBottom: '44px' }} />

                                        <Statistic title='Total User' value={user.length} />
                                    </Space>


                                </Card>



                            </Space>
                        </Typography.Title>
                        <CustomDropdown />


                        <Typography.Text>
                            <Typography.Title level={4} >
                                <Space style={{ display: 'flex', justifyContent: 'center', overflowX: 'scroll' }} >
                                    <MainChart />


                                </Space>


                            </Typography.Title>






                        </Typography.Text>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AdminDashBoard;