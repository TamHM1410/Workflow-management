import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Card, Space, Typography, Statistic } from 'antd';
import TableTask from './TableTask';
import Chart from './Chart';
import { useSelector } from 'react-redux';
import { ArrowRightOutlined } from '@ant-design/icons';
import CustomDropdown from '../Dropdown';
import '../Responsive.css'


const { Content, Sider } = Layout;
const option = ['DashBoard', 'Order', 'Customer']



const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);
        const name = option[index]
        const handleClick = () => {
            console.log(`Option ${key} được click`);
            // Do something khi option được click
        };

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: ` ${name}`,


        };
    },
);


const Dashboard: React.FC = () => {
    const [selectedOptionKey, setSelectedOptionKey] = useState('');
    const data = useSelector((state) => state.getTaskReducer)
    const pending = useSelector((state) => state.getPedingReducer)
    const complete = useSelector((state) => state.getCompleteReducer)
    const inprocess = useSelector((state) => state.getInprocessReducer)
    const overdue = useSelector((state) => state.getOverDueReducer)
    const taskEnd = useSelector((state) => state.getTaskEndReducer)










    // const pending = data?.filter((item: { Status: number }) => item.Status === 0)
    // const inprocess = data?.filter((item) => item.Status === 1)
    // const complete = data?.filter((item) => item.Status === 2)
    // const overdue = data?.filter((item) => Date.parse(item.prjEnd) < today.getTime() && item.Status === 0)



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
                            <Space className='space' >

                                <Card >


                                    <Statistic title='Number of Task ' value={data.length} />


                                </Card>
                                <ArrowRightOutlined />

                                <Card>

                                    <Statistic title='OverDues Task ' value={overdue.length} />

                                </Card>
                                <ArrowRightOutlined />
                                <Card>

                                    <Statistic title='Pending Task' value={pending.length} />

                                </Card>
                                <ArrowRightOutlined />
                                <Card>

                                    <Statistic title='InProcessing Task' value={inprocess.lenght} />

                                </Card>
                                <ArrowRightOutlined />
                                <Card>

                                    <Statistic title='Complete Task' value={complete.length} />

                                </Card>
                                <ArrowRightOutlined />
                                <Card>

                                    <Statistic title='Task will need to be completed in the next 3 days' value={taskEnd.length} />

                                </Card>

                            </Space>
                        </Typography.Title>
                        <CustomDropdown />
                        <Typography.Text>
                            <Typography.Title level={4} className='block' style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'scroll' }}>
                                <Space >
                                    <TableTask />



                                </Space>
                                <Space>
                                    <Chart />

                                </Space>


                            </Typography.Title>






                        </Typography.Text>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Dashboard;