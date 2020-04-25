import React, { useEffect, useState } from 'react'
import { withRouter, } from 'react-router-dom';

import './index.css';
import { get } from '../../../utils/request';
import { List, Avatar } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";


function ArticleList(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        get('/article').then(res => {
            setData(res.articleList);
        })
    }, []);

    const IconText = ({ icon, text }) => (
        <span>
            {React.createElement(icon, { style: { marginRight: 8 } })}
            {text}
        </span>
    );

    const sliceText = (text, len) => {
        return text.length > len ? `${text.slice(0, len)}......` : text;
    }

    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 7,
                }}
                dataSource={data}
                header={`${data.length > 1 ? '' : '当前没有文章，快去发布你的想法吧！'}`}
                itemLayout="horizontal"
                // renderItem={(topComments) => articleList([topComments], comments)}
                renderItem={(item, index) => (
                    <List.Item
                        key={`${item.title}-${index}`}
                        actions={[
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a onClick={() => props.history.push(`/home/article/${item._id}`)}>{sliceText(item.title, 40)}</a>}
                        />
                        <div style={{marginTop: 5}}></div>
                        {sliceText(item.describe, 90)}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default withRouter(ArticleList);
