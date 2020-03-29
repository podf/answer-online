import React from 'react';
import { Layout, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import img from '../../img/bg.jpg';
import '../../public/iconfont/iconfont.css'
import './index.css';

const { Header, Content, Footer } = Layout;


function Frame(props) {
    return (
        <aside style={{ flex: '0 0 30%', maxWidth: '30%', height: 300, }}>
            <Card title="公告" bordered={false}>
                <div>
                    1231313231
                </div>
            </Card>
            <Card title="能力值排行" bordered={false}>
                <div>
                    1231313231
                </div>
            </Card>
        </aside>
    )
}

export default withRouter(Frame);
