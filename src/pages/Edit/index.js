import React from 'react'
import { Input, Button } from 'antd';

import './index.css';

const { TextArea } = Input;
function Edit() {
    const onChange = e => {
        console.log(e);
    };
    return (

        <div className="root">
            <div className="title">
                <span className="titleFont">标题</span>
                <Input placeholder="文章标题" allowClear onChange={onChange} />
            </div>
            <div className="describe">
                <span className="describeFont">文章内容</span>
                <TextArea placeholder="说点有意思的吧" allowClear onChange={onChange} autoSize={{ minRows: 3, maxRows: 29 }} />
            </div>
            <div className="sumbit">
                <Button>提交</Button>
            </div>
        </div>
    )
}

export default Edit;


