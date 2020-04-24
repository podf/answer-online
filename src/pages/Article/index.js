import React, { useEffect, useState } from 'react'
import { Comment, Avatar, Form, Button, List, Input, Modal } from 'antd';
import moment from 'moment';

import { get, post } from '../../utils/request';

function Article(props) {
    const [value, setValue] = useState('');
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [topComments, setTopComments] = useState([]);
    const [commentChange, setCommentChange] = useState(true);
    // 按钮loading
    const [submitting, setSubmitting] = useState(false);

    const [replayDialogShow, setReplayDialogShow] = useState(false);
    const [replayId, setReplayId] = useState('');
    const [replayName, setReplayName] = useState('');
    const [replayMessages, setReplayMessages] = useState('');
    const username = localStorage.getItem('username');

    useEffect(() => {
        // 查询当前文章的内容及评论
        const id = props.match.params.id;
        get(`/article/${id}`).then(res => {
            setContent(res.article.describe);
        })
        get(`/comment/${id}`).then(res => {
            setComments(res.comments);
            setTopComments(res.topComments);
        })
    }, []);

    useEffect(() => {
        setCommentChange(true);
    }, [comments])

    const { TextArea } = Input;

    // click replay span
    const replay = (parentId, replayName) => {
        setReplayId(parentId);
        setReplayName(replayName);
        setReplayMessages('');
        setReplayDialogShow(true);
    }

    const handleReplayMessages = e => {
        setReplayMessages(e.target.value);
    }

    const handleReplayOk = async () => {
        const res = await post('/comment', {
            _id: props.match.params.id,
            author: username,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            to: replayName,
            content: replayMessages,
            parentId: replayId,
        });
        const commentsData = comments
        commentsData.push({ ...res.comments, actions: [<span key="comment-nested-reply-to" onClick={() => replay(res.comments._id, res.comments.to)}>Reply to</span>] });
        setComments(commentsData);
        setReplayDialogShow(false);
    }

    const filterChildComments = (_id) => {
        const res = comments.filter(item => item.parentId === _id);
        return res;
    }

    const articleList = (topComments, allComments) => {
        return topComments.map(item=> {
            const childComments = filterChildComments(item._id);
            if (childComments.length < 1) {
                return <Comment
                    author={item.author}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt={item.author}
                        />
                    }
                    content={item.content}
                    actions={[<span key="comment-nested-reply-to" onClick={() => replay(item._id, item.to)}>Reply to</span>]}
                ></Comment >
            } else {
                return <Comment
                    author={item.author}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt={item.author}
                        />
                    }
                    content={item.content}
                    actions={[<span key="comment-nested-reply-to" onClick={() => replay(item._id, item.to)}>Reply to</span>]}
                >
                    {articleList(childComments, allComments)}
                </Comment >
            }
        })
    }

    const CommentList = ({ comments }) => (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={topComments}
            header={`${topComments.length} ${topComments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={(topComments) => articleList([topComments], comments)}
        />
    );

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = async () => {
        setSubmitting(true);
        const username = localStorage.getItem('username');
        const res = await post('/comment', {
            _id: props.match.params.id,
            author: username,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            to: username,
            content: value,
            parentId: '',
        });
        await get(`/comment/${props.match.params.id}`).then(res => {
            setComments(res.comments);
            setTopComments(res.topComments);
        })
        setValue('');
        setSubmitting(false);
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
                        <div>
                            <Form.Item>
                                <TextArea rows={4} onChange={handleChange} value={value} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                                    发言
                            </Button>
                            </Form.Item>
                        </div>
                    }
                />
                {comments.length > 0 && <CommentList comments={comments} />}
                <Modal
                    title={`回复${replayName}`}
                    visible={replayDialogShow}
                    onOk={handleReplayOk}
                    onCancel={() => setReplayDialogShow(false)}
                >
                    <TextArea rows={4} value={replayMessages} onChange={handleReplayMessages} />
                </Modal>
            </div>
        </div>
    )
}

export default Article;
