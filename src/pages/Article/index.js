import React, { useEffect, useState } from 'react'
import { get } from '../../utils/request';

function Article(props) {
    const [content, setContent] = useState('');

    useEffect(() => {
        const id = props.match.params.id;
        get(`/article/${id}`).then(res => {
            setContent(res.article.describe);
        })
    }, [content]);

    console.log(content, 'content')
    return (
        <div>
            <div>
                {content}
            </div>
            <div>
                评论
            </div>
        </div>
    )
}

export default Article;
