import React, { useEffect, useState } from 'react'
import { Comment, Avatar, Form, Button, List, Input, Modal } from 'antd';
import moment from 'moment';

import { get, post } from '../../utils/request';

function Article(props) {
    const [value, setValue] = useState('');
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [topComments, setTopComments] = useState([]);
    // 按钮loading
    const [submitting, setSubmitting] = useState(false);

    const [replayDialogShow, setReplayDialogShow] = useState(false);
    const [replayName, setReplayName] = useState('');
    const [replayMessages, setReplayMessages] = useState('');

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
        // setComments([{
        //     author: 'Han Solo',
        //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //     content: 'fjdsfa',
        //     datetime: moment().fromNow(),
        // }])
    }, []);


    const { TextArea } = Input;

    // click replay span
    const replay = (commitId, replayName) => {
        setReplayName(replayName);
        setReplayDialogShow(true);
    }

    const handleReplayMessages = e => {
        setReplayMessages(e.target.value);
    }

    const handleReplayOk = () => {
        setReplayDialogShow(false);
    }

    const fintChildComments = (_id) => {
        const res = comments.filter(item => item.parentId === _id);
        console.log(res ,'res')
        return res;
    }

    const articleList = (topComments, allComments) => {
        console.log(topComments, 'topComments')
        return topComments.map(item => {
            const childComments = fintChildComments(item._id);
            console.log(childComments, 'childComments')
            if (childComments.length < 1) {
                return < Comment
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
                return < Comment
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

    // 初始化渲染评论
    const ExampleComment = ({ props }) => {
        return articleList(topComments, comments);
        console.log(props, 'props 1')
        // 在这里渲染一条评论

        if (props.child.length > 0) {
            return < Comment
                {
                ...props
                }
                actions={[<span key="comment-nested-reply-to" onClick={() => replay(props._id, props.to)}>Reply to</span>]}
            >
                <Comment
                    {...props}
                >
                    {}
                </Comment >
            </Comment >
        } else {
            return <Comment
                {
                ...props
                }
                actions={[<span key="comment-nested-reply-to" onClick={() => replay(props._id, props.to)}>Reply to</span>]}
            />
        }
    };

    const CommentList = ({ comments }) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={props => <ExampleComment props={props} />}
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

    const handleSubmit = async () => {
        // setValue(e.targe.value);
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
        setSubmitting(false);
        const commentsData = comments
        commentsData.push({ ...res.comments, actions: [<span key="comment-nested-reply-to" onClick={() => replay(res.comments._id, res.comments.to)}>Reply to</span>] });
        console.log(commentsData, 'commentsData ')
        setComments(commentsData);
        setValue('');
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
