import React, { useEffect } from 'react';
import { message } from 'antd';

function Admin() {
    useEffect(() => {
        const identity = localStorage.getItem('identity');
        if (identity == 1) {
            message.error('权限不足, 请重新登录');
            window.location.href = '#/login';
            localStorage.clear();
        }
    }, []);
    return (
        <h1>Admin</h1>
    )
}

export default Admin;