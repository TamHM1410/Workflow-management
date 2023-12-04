import { NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Navbar, NavDropdown } from 'react-bootstrap';
import './style.css'





function Header() {
    const navigate = useNavigate()
    const cookies = useCookies(['userInfo'])
    const cookiesClone = cookies[0]

    const [setCookie, removeCookie] = useCookies(['userInfo', 'checked']);
    const logOut = () => {
        console.log('cookie', cookies)
        removeCookie('userInfo', { path: '/' });
        removeCookie('checked', { path: '/' });


        navigate('/login')



    }

    // if (!cookiesClone?.userInfo) {
    //     return null;
    // }


    return (


        <>
            {cookiesClone.userInfo?.role === 1 ? <div className='navibar'>
                <Navbar expand="lg" className="bg-body-tertiary" style={{ display: 'flex', justifyContent: 'space-between ', paddingBottom: '15px', paddingTop: '15px', width: '100%' }}>
                    <Breadcrumb
                        items={[
                            {
                                href: '/task',
                                title: <HomeOutlined />,
                            },
                            {

                                title: (
                                    <>
                                        <UserOutlined />
                                        <NavLink to='/edit' style={{ textDecoration: 'none' }}>User</NavLink>

                                    </>
                                ),
                            },
                            {

                                title: (
                                    <>
                                        <UserOutlined />
                                        <NavLink to='/task' style={{ textDecoration: 'none' }}>Task</NavLink>

                                    </>
                                ),
                            },
                            {

                                title: (
                                    <>
                                        <UserOutlined />
                                        <NavLink to='/project' style={{ textDecoration: 'none' }}>Project</NavLink>

                                    </>
                                ),
                            },
                            {

                                title: (
                                    <>
                                        <UserOutlined />
                                        <NavLink to='/dashboard' style={{ textDecoration: 'none' }}>DashBoard</NavLink>
                                    </>
                                ),
                            },

                        ]}
                    />
                    <div><NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{ left: '-73px' }} className='dropdownbar'>
                        {cookiesClone.userInfo?.isLogIn === true ? (<><NavDropdown.Item > <NavLink to="/userDetail" style={{ textDecoration: 'none' }}>InForMation</NavLink></NavDropdown.Item>

                            <NavDropdown.Item > <NavLink to="/login" onClick={logOut} style={{ textDecoration: 'none' }}>log out</NavLink></NavDropdown.Item></>)


                            : (<><NavDropdown.Item > <NavLink to="/login" style={{ textDecoration: 'none' }}>Login</NavLink></NavDropdown.Item>
                                <NavDropdown.Item >
                                    Another action
                                </NavDropdown.Item></>)}



                    </NavDropdown></div>

                </Navbar>
            </div>
                :



                <div className='navibar'>
                    <Navbar expand="lg" className="bg-body-tertiary" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px', paddingTop: '15px', width: '100%', marginRight: '0' }}>
                        <Breadcrumb
                            items={[
                                {
                                    href: '/task',
                                    title: <HomeOutlined />,
                                },
                                {

                                    title: (
                                        <>
                                            <UserOutlined />
                                            <NavLink to='/task' style={{ textDecoration: 'none' }}>Task</NavLink>

                                        </>
                                    ),
                                },
                                {

                                    title: (
                                        <>
                                            <UserOutlined />
                                            <NavLink to='/project' style={{ textDecoration: 'none' }}>Project</NavLink>

                                        </>
                                    ),
                                }
                                ,
                                {

                                    title: (
                                        <>
                                            <UserOutlined />
                                            <NavLink to='/dashboard' style={{ textDecoration: 'none' }}>Dashboard</NavLink>

                                        </>
                                    ),
                                }
                            ]}
                        />
                        <div><NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{ left: '-73px' }} className='dropdownbar'>
                            {cookiesClone.userInfo?.isLogIn === true ? (<><NavDropdown.Item > <NavLink to="/userDetail" style={{ textDecoration: 'none' }}>InForMation</NavLink></NavDropdown.Item>

                                <NavDropdown.Item > <NavLink to="/login" onClick={logOut} style={{ textDecoration: 'none' }}>log out</NavLink></NavDropdown.Item></>)


                                : (<><NavDropdown.Item > <NavLink to="/login" style={{ textDecoration: 'none' }}> Login</NavLink></NavDropdown.Item>
                                    <NavDropdown.Item >
                                        Another action
                                    </NavDropdown.Item></>)}



                        </NavDropdown></div>

                    </Navbar>
                </div>

            }

        </>
    );
}

export default Header;