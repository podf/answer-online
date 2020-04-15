import React, { useEffect, useState } from 'react'
import { withRouter, } from 'react-router-dom';

import './index.css';
import { get } from '../../../utils/request';

function List(props) {
    const [data, setData] = useState([{}]);
    useEffect(() => {
        get('/article').then(res => {
            setData(res.articleList);
        })
    }, []);

    return (
        <div>
            {console.log(data, 'data')}
            {
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
            }
        </div>
    )
}

export default withRouter(List);
