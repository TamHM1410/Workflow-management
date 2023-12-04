import { useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"

import { toast } from "react-toastify";
import { getAllUser } from "../../service/UserService";
import axios from "axios"
import { Button, Checkbox, Form, Input, Typography } from 'antd';


const Register = () => {
    const [inputEmail, setInputEmail] = useState<string>('')
    const [inputPass, setInputPass] = useState<string>('')
    const [seclectedRole, setSeclectedRole] = useState<number>(0)
    const navigate = useNavigate()

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSeclectedRole(Number(event.target.value));
    };
    const handleRegister = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const res = await getAllUser()
        const test = res.data.filter((item) => item.Email === inputEmail)

        if (test.length === 1) {
            toast.error('exist user mail')

        } if (test.length === 0) {
            console.log('test', test)
            const url = 'http://127.0.0.1:1880/user';
            const data = {
                Email: inputEmail,
                Password: '123',
                Name: inputPass,
                Role: seclectedRole
            };

            try {
                const response = await axios.post(url, data);
                console.log('response', response);


            } catch (error) {
                console.log('error', error);

            }
            toast.success('Register successc ')
            navigate('/login')
        }


    }
    const handleCancle = (): void => {
        navigate('/login')
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    return (
        <>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Kenia&display=swap');
            </style>
            <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Kenia, sans-serif' }}></div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10%    ', borderStyle: 'solid', borderWidth: '2px', borderColor: 'black', width: '50%', marginLeft: '26%' }}>




                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600, marginTop: '15px', marginRight: '25px' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <h3 style={{ fontFamily: 'Kenia, sans-serif', display: 'flex', justifyContent: 'center' }}>Register your Account</h3>
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input onChange={(e) => setInputEmail(e.target.value)} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password onChange={(e) => setInputPass(e.target.value)} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={handleRegister} disabled={inputEmail && inputPass ? false : true}>
                            Submit
                        </Button>
                        <Button style={{ marginLeft: '20px' }} onClick={handleCancle}>Cancle</Button>
                    </Form.Item>
                </Form>
            </div>





        </>
    )

}
export default Register