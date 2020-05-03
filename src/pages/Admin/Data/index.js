import React from 'react'
import { Card, message, Form, Button, Popconfirm } from 'antd';

import { del } from '../../../utils/request';


function DataManagement() {
    const deleteAllData = async () => {
        const { code } = await del('/data')
        if (code === 0) {
            message.success('数据清除成功');
        }
    };

    return (
        <Card title="清除数据">
            <div style={{ display: 'flex', justifyContent: "center", width: '100%' }}>
                <Popconfirm title="数据删除后不可恢复，确定要删除吗？" onConfirm={deleteAllData}>
                    <Button type="danger" htmlType="submit" style={{ width: '80%' }}>
                        清除数据
                    </Button>
                </Popconfirm>
            </div>
        </Card>
    )
}

export default DataManagement
