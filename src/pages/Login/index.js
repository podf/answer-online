import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './login.css';

function Login() {
    const onFinish = async values => {
        const { username, password } = values;
        const { data } = await Axios.post('http://localhost:3001/login', { username, password });
        const { code, identity } = data;
        // history.push('/register') ;
        if (code === 401) {
            message.error(data.message);
            return;
        }
        if (identity === 1) {
            window.location.href = '#/';
        } else {
            // 跳转admin页面
            window.location.href = '#/';
        }
    };
    return (
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
                <Form.Item>
                    <a href="#/register">register</a> |
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>
            </Form>
        </Card >
    );
}

export default Login;

