import React, { useState, useEffect } from 'react'
import { Card, message, Table, Popconfirm } from 'antd';

import { get, del } from '../../../utils/request';

function UserManagement() {

    const [data, setData] = useState();

    useEffect(() => {
        get('/user').then(res => {
            const dataSource = res.allUser.map(item => { const { _id, username, identity, created } = item; return { _id, username, identity, created } })
            setData(dataSource);
        })
    }, []);


    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '权限',
            dataIndex: 'identity',
            key: 'identity',
            render: (identity) => parseInt(identity) === 1 ? '用户' : '管理员'
        },
        {
            title: '创建时间',
            dataIndex: 'created',
            key: 'created',
            render: (time) => new Date(time).toLocaleString()
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Popconfirm
                    title={`确认要删除${record.username}吗`}
                    onConfirm={async () => await handleDel(text, record)}
                >
                    <a>删除</a>
                </Popconfirm>
            ),
        },
    ];


    const handleDel = async (text, record) => {
        console.log(text, 'text')
        console.log(record, 'record');

        const { code } = await del(`/user/${record._id}`)
        if (code === 0) {
            await get('/user').then(res => {
                const dataSource = res.allUser.map(item => { const { _id, username, identity, created } = item; return { _id, username, identity, created } })
                setData(dataSource);
            })
            message.success('删除成功')
        }
    }

    return (
        <div>
            <Card title="用户管理" extra={<input />}>
                <Table columns={columns} dataSource={data} />
            </Card>
        </div>
    )
}

export default UserManagement
