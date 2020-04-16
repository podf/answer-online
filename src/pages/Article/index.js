import React, { useEffect, useState } from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

import { get, post } from '../../utils/request';

function Article(props) {
    const [value, setValue] = useState('');
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const id = props.match.params.id;
        get(`/article/${id}`).then(res => {
            setContent(res.article.describe);
        })
        // setComments([{
        //     author: 'Han Solo',
        //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //     content: 'fjdsfa',
        //     datetime: moment().fromNow(),
        // }])
    }, [content]);


    const { TextArea } = Input;

    // 初始化渲染评论
    const ExampleComment = ({ props }) => {
        console.log(props, 'props')
        // 在这里渲染一条评论
        return < Comment
            {...props}
        >
            <Comment
                {...props}
            >
                {}
            </Comment >
        </Comment >
    };

    const CommentList = ({ comments }) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            // renderItem={props => <ExampleComment props={props} />}
            renderItem={props => <Comment {...props} />}
        />
    );

    const Editor = ({ onChange, onSubmit, submitting, value }) => (
        <div>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    发言
            </Button>
            </Form.Item>
        </div>
    );

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = async (e) => {
        // setValue(e.targe.value);
        setSubmitting(true);
        const username = localStorage.getItem('username');
        setTimeout(() => {
            setSubmitting(false);
            const commentsData = comments
            commentsData.push({
                author: `${username}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: <p>{value}</p>,
                datetime: moment().fromNow(),
            })
            setComments(commentsData);
            setValue('');
        }, 200);
        await post('/comment', {
            _id: props.match.params.id,
            from: username,
            to: '',
            content: value,
            parentId: '',
        });
    }

    return (
        <div>
            <div>
                {content}
            </div>
            <div>
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
                {comments.length > 0 && <CommentList comments={comments} />}
            </div>
        </div>
    )
}

export default Article;
