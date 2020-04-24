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

    return (
        <div>
            {console.log(data, 'data')}
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={data}
                // header={`${data.length} ${data.length > 1 ? 'replies' : 'reply'}`}
                itemLayout="horizontal"
                // renderItem={(topComments) => articleList([topComments], comments)}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
            {/* {
                data.map(item => {
                    return <div className="list_box" onClick={() => props.history.push(`/home/article/${item._id}`)}>
                        <div className="list_title">
                            {item.title}
                        </div>
                        <div className="list_content">
                            {item.describe}
                        </div>
                        <div className="list_footer">
                            <div>
                                点赞数
                            </div>
                            <div>
                                评论数
                            </div>
                        </div>
                    </div>
                })
            } */}
        </div>
    )
}

export default withRouter(ArticleList);
