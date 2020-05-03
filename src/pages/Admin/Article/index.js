import React, { useState, useEffect } from 'react'
import { Card, message, Table, Popconfirm } from 'antd';

import { get, del } from '../../../utils/request';

function ArticleManagement() {
    const [data, setData] = useState();

    useEffect(() => {
        get('/article').then(res => {
            const dataSource = res.articleList.map(item => { const { _id, title, username, created } = item; return { _id, title, username, created } })
            setData(dataSource);
        })
    }, []);


    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '创建人',
            dataIndex: 'username',
            key: 'username',
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
                    title={`确认要删除${record.title}吗`}
                    onConfirm={async () => await handleDel(text, record)}
                >
                    <a>删除</a>
                </Popconfirm>
            ),
        },
    ];


    const handleDel = async (text, record) => {
        const { code } = await del(`/aritcle/${record._id}`)
        if (code === 0) {
            await get('/article').then(res => {
                const dataSource = res.articleList.map(item => { const { _id, title, username, created } = item; return { _id, title, username, created } })
                setData(dataSource);
            })
            message.success('删除成功')
        }
    }

    return (
        <div>
            <Card title="文章管理" extra={<input />}>
                <Table columns={columns} dataSource={data} />
            </Card>
        </div>
    )
}

export default ArticleManagement;
