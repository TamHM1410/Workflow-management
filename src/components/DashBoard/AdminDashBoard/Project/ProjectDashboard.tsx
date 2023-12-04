import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Card, Space, Typography, Statistic } from 'antd';
import ProjectChart from './ProjectChart';

import { useSelector } from 'react-redux';
import { ArrowRightOutlined } from '@ant-design/icons';
import CustomDropdown from '../Dropdown';
import TableProject from './TableProject';
import '../Responsive.css'


const { Content, Sider } = Layout;
const option = ['DashBoard', 'Order', 'Customer']



const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);
        const name = option[index]
        const handleClick = () => {
            console.log(`Option ${key} được click`);

        };

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: ` ${name}`,


        };
    },
);


const ProjectDashboard: React.FC = () => {
    const [selectedOptionKey, setSelectedOptionKey] = useState('');
    const totalProject = useSelector((state) => state.getAllProjectReducer)
    const processProject = useSelector((state) => state.getProceesingProjectReducer)
    const zero = useSelector((state) => state.getPriorityZeroReducer)
    const one = useSelector((state) => state.getPriorityOneReducer)
    const two = useSelector((state) => state.getPriorityTwoReducer)
    const seven = useSelector((state) => state.getProjectSevenReducer)

    const handleOptionClick = (key: string) => {
        setSelectedOptionKey(key);
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();



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
                <Layout style={{ padding: '0 24px 24px' }}>
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
                            <Space className='space'>

                                <Card className='flex-card' style={{ padding: '10px' }}>


                                    <Statistic title='Total Project ' value={totalProject.length} />


                                </Card>


                                <ArrowRightOutlined />
                                <Card className='flex-card' style={{ padding: '10px' }}>

                                    <Statistic title='Procesing Project ' value={processProject.length} />

                                </Card>
                                <ArrowRightOutlined />
                                <Card className='flex-card' style={{ padding: '10px' }}>

                                    <Statistic title='Priority: 0' value={zero.length} />

                                </Card>
                                <ArrowRightOutlined />
                                <Card className='flex-card' style={{ padding: '10px' }}>

                                    <Statistic title='Priority:1' value={one.length} />

                                </Card>
                                <ArrowRightOutlined />
                                <Card className='flex-card' style={{ padding: '10px' }}>

                                    <Statistic title='Priority:2' value={two.length} />

                                </Card>
                                <ArrowRightOutlined />
                                <Card className='flex-card' style={{ width: '100%', padding: '10px' }}>

                                    <Statistic title='Project will be release in the next 7 days' value={seven.length} />

                                </Card>

                            </Space>
                        </Typography.Title>
                        <CustomDropdown />
                        <Typography.Text>
                            <Typography.Title level={4} style={{ display: 'flex', justifyContent: 'space-around', overflowX: 'scroll' }} className='block'>
                                <Space  >
                                    <TableProject />




                                </Space>
                                <Space>
                                    <ProjectChart />
                                </Space>


                            </Typography.Title>






                        </Typography.Text>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default ProjectDashboard;