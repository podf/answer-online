import React, { useState } from 'react'
import {
    Modal,
    Form,
    Input,
    Tooltip,
    Select,
    Button,
    Card,
    message
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { post } from '../../../utils/request';
import './userInfo.css';

const { Link } = require('react-router-dom');

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};



export default function UserInfo(props) {
    const { dialogShow, handleDialogShow } = props;

    const [confirmLoading, setConfirmLoading] = useState(false);

    const modifyInfo = () => {
        setTimeout(() => {
            setConfirmLoading(true);
        }, 200)
    }

    const [form] = Form.useForm();

    const onFinish = async values => {
        const { username, password, phone, email } = values;
        const { code, identity } = await post('/register', { username, password, phone, email });

        if (code === 406) {
            message.error('用户名已存在');
            return;
        }
        if (identity === 1) {
            window.location.href = '#/login';
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    return (
        // <Modal
        //     title="个人设置"
        //     visible={dialogShow}
        //     onOk={() => modifyInfo()}
        //     confirmLoading={confirmLoading}
        //     onCancel={() => handleDialogShow(false)}
        // >
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label={
                    <span>
                        修改用户名
                        </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="修改密码"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="确认密码"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: '请填写密码!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject('两次密码不一致');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="phone"
                label="修改电话"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>
            <Form.Item
                name="email"
                label="修改电子邮箱"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item {...tailFormItemLayout} >
                <Button type="primary" htmlType="submit">
                    注册
                    </Button>
                <Button type="ghost" style={{ marginLeft: 30 }}>
                    <Link to="/login"> 取消</Link>
                </Button>
            </Form.Item>
        </Form>
    )
}
