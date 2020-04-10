import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import './login.css';
import { setToken } from '../../utils/auth';
import { post } from '../../utils/request';

function Login() {
    const onFinish = async values => {
        const { username, password } = values;
        const data = await post('/login', { username, password });

        console.log(data, 'data');
        // console.log(code, 'code');
        const { code, token, identity } = data;
        if (code === 401) {
            message.error(data.message);
            return;
        }
        setToken('username', username);
        setToken('identity', identity);
        setToken('token', token);
        if (parseInt(identity) === 1) {
            window.location.href = '#/home/main';
        } else {
            // 跳转admin页面
            window.location.href = '#/admin';
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

