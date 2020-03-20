import React from 'react';
import Axios from 'axios';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './login.css';

function Login() {
    const onFinish = async values => {
        const { username, password } = values;
        const { data } = await Axios.post('http://localhost:3001/api/login', { username, password });
        // Axios.interceptors.request.use(config => {    //配置axios请求头，axios每次发起请求携带token，在Network中的headers看的到
        //     // console.log(config)
        //     config.headers.Authorization = 'afed'  //Authorization  是请求头要求加上的字段
        //     // config.headers.Authorization = window.sessionStorage.getItem('token')  //Authorization  是请求头要求加上的字段
        //     return config
        // })


        const { code, identity } = data;
        if (code === 401) {
            message.error(data.message);
            return;
        }
        localStorage.setItem('username', username);
        localStorage.setItem('identity', identity);
        if (identity === 1) {
            window.location.href = '#/';
        } else {
            // 跳转admin页面
            window.location.href = '#/';
        }
    };
    return (
        <div className="loginBody">
            <Card title="QF Admin SYS" className="login-form">
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" >
                            登录
                        </Button>
                    </Form.Item>
                    <Form.Item >
                        <div className="login-form-footer-btnGroup">
                            <a href="#/register">注册</a>
                            <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                            <a className="login-form-forgot" href="#/login">
                                找回密码
                            </a>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Login;

