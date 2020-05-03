import React, { useState } from 'react'
import { Input, Button } from 'antd';

import { post } from '../../../utils/request';

import './index.css';

const { TextArea } = Input;
function Edit(props) {
    const [title, setTitle] = useState('');
    const [describe, setDescribe] = useState('');


    const submit = async () => {
        const userId = localStorage.getItem('userId');
        const { code } = await post('/article', { userId, title, describe });
        if (code === 0) {
            props.history.push('/home')
        }
        console.log(title, 'title')
        console.log(describe, 'describe')
    };
    return (
        <div className="root">
            <div className="title">
                <span className="titleFont">标题</span>
                <Input placeholder="文章标题" allowClear onChange={e => setTitle(e.target.value)} value={title} />
            </div>
            <div className="describe">
                <span className="describeFont">文章内容</span>
                <TextArea placeholder="说点有意思的吧" allowClear onChange={e => setDescribe(e.target.value)} value={describe} autoSize={{ minRows: 3, maxRows: 29 }} />
            </div>
            <div className="sumbit">
                <Button onClick={submit}>提交</Button>
            </div>
        </div>
    )
}

export default Edit;


