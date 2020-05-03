import React from 'react';
import { Layout, Card } from 'antd';
import { withRouter } from 'react-router-dom';

import Announcement from './Announcement';
import RankingList from './RankingList';

import './index.css';
import '../../public/iconfont/iconfont.css'

const { Header, Content, Footer } = Layout;


function Frame(props) {
    return (
        <aside style={{ flex: '0 0 30%', maxWidth: '30%', height: 300, }}>
            <Announcement />
            <RankingList />
            {/* <Card title="公告" bordered={false}>
                <div>
                    12313132313333
                </div>
            </Card> */}
        </aside>
    )
}

export default withRouter(Frame);
