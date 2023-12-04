import React, { useState, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Card, Space, Typography, Statistic } from 'antd';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowRightOutlined, UserOutlined, YuqueOutlined, SlackSquareOutlined } from '@ant-design/icons';
import './UserResponsive.css'
import { getProjectByUserState } from '../../../redux/feature/projectByUserState/projectByUser';
import { getAllTask } from '../../../service/UserService';
import { getTaskState } from '../../../redux/feature/getTaskSlice';
import UserTasKTable from './UserTaskTable/UserTaskTable';
import AddFilter from './UserTaskTable/Filter';
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

const { Content, Sider } = Layout;
const option = ['DashBoard']



const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);
        const name = option[index]
        const handleClick = () => {

        };

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: ` ${name}`,


        };
    },
);


const UserRoleDashboard: React.FC = () => {


    const dispatch = useDispatch()
    const [selectedOptionKey, setSelectedOptionKey] = useState('');
    const [cookies, setCookie] = useCookies(['checked', 'userInfo']);
    const [state, setState] = useState(false)
    const [prjRelease, setPrj] = useState<DataType[]>()
    const [clone, setClone] = useState<DataType[]>()
    const [clone1, setClone1] = useState<DataType[]>()
    const project = useSelector((state) => state.getProjectbyUserReducer)
    const task: DataType[] = useSelector((state) => state.getTaskReducer)









    const getData = async () => {
        const today = new Date()



        const res2 = await getAllTask()
        const faker = res2.data.filter((item) => today.getTime() <= Date.parse(item.prjStart))
        setPrj(faker)
        setCookie('checked', { checked: true })
        if (cookies.userInfo?.role === 0) {
            const test = res2.data.filter((item: api) => cookies.userInfo.email === item.UserMail)
            const list = test.sort((a: api, b: api) => b.Id - a.Id)
            setClone(test)
            setClone1(test)
            dispatch(getTaskState(list))
            const uniqueNumbers: array = [];
            const existingProjectIds = [];

            test.forEach(item => {
                if (!existingProjectIds.includes(item.ProjectId)) {
                    uniqueNumbers.push(item);
                    existingProjectIds.push(item.ProjectId);
                }
            });


            dispatch(getProjectByUserState(uniqueNumbers))







        }
        if (state === false) {
            setState(true)
        } else setState(false)





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
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>

                        <Breadcrumb.Item>User Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Typography.Title level={4}  >
                            <Space className='block' >

                                <Card className='space' >
                                    <Space  >
                                        <YuqueOutlined style={{ marginBottom: '44px' }} />


                                        <Statistic title='Total Project ' value={project?.length} />
                                    </Space>


                                </Card>


                                <Card className='space'>
                                    <Space>

                                        <SlackSquareOutlined style={{ marginBottom: '44px' }} />

                                        <Statistic title='Total Task ' value={task?.length} />
                                    </Space>


                                </Card>
                                <Card className='space'>
                                    <Space>

                                        <SlackSquareOutlined style={{ marginBottom: '44px' }} />

                                        <Statistic title='7 Days prj release ' value={prjRelease?.length} />
                                    </Space>


                                </Card>






                            </Space>
                        </Typography.Title>
                        <AddFilter clone={clone} clone1={clone1} setClone={setClone} />



                        <Typography.Text>
                            <Typography.Title level={4} >
                                <Space style={{ display: 'flex', justifyContent: 'center', overflowX: 'scroll' }} >
                                    <UserTasKTable state={state} clone={clone} />



                                </Space>


                            </Typography.Title>






                        </Typography.Text>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default UserRoleDashboard;