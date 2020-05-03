import React from 'react'
import { Card, Form, Button, Input, message } from 'antd';
import { post } from '../../../utils/request';

function AnnouncementManagement() {

    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = async (values) => {
        const { code } = await post('/announcement', {
            userId,
            username,
            describe: values.announcement
        })
        if (code === 0) {
            message.success('发布成功');
        }
    };

    return (
        <Card title="发布公告">
            <Form onFinish={onFinish}>
                <Form.Item
                    label="公告"
                    name="announcement"
                    rules={[{ required: true, message: '公告不能为空!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        发布
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default AnnouncementManagement
