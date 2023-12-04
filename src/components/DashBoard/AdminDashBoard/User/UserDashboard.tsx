import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Card, Space, Typography, Statistic } from 'antd';
import { useSelector } from 'react-redux';
import UserChart from './UserChart';
import TableUser from './TableUser';
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

            children: new Array(3).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                    onClick: handleClick
                };
            }),
        };
    },
);

const UserDashboard = () => {
    const totalUser = useSelector((state) => state.getAllUserReducer)
    const admin = useSelector((state) => state.getRoleAdminReducer)
    const user = useSelector((state) => state.getRoleUserReducer)
    const handleOptionClick = (key: string) => {
        setSelectedOptionKey(key);
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (<>
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

                                <Card style={{ width: '100%' }}>


                                    <Statistic title='Total Users' value={totalUser.length} />


                                </Card>


                                <Card style={{ width: '100%' }}>

                                    <Statistic title='Admin ' value={admin.length} />

                                </Card >

                                <Card style={{ width: '100%' }}>

                                    <Statistic title='Users' value={user.length} />

                                </Card>




                            </Space>
                        </Typography.Title>
                        <CustomDropdown />
                        <Typography.Text>
                            <Typography.Title level={4} className='block' >
                                <Space style={{ display: 'flex', overflowX: 'scroll' }}>

                                    <TableUser />
                                    <UserChart />

                                </Space>


                            </Typography.Title>






                        </Typography.Text>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </>)

}
export default UserDashboard