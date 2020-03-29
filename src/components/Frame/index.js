import React from 'react';
import { Layout, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import img from '../../img/bg.jpg';
import '../../public/iconfont/iconfont.css'
import './index.css';

const { Header, Content, Footer } = Layout;


function Frame(props) {
    return (
        <Layout style={{
            maxWidth: 1100,
            height: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
        }} >
            <Header className="headerBar">
                <div className="header-content">
                    <div className="header-logo">
                        <span className="iconfont icon-xuexi header-icon"></span>
                        <span>在线答疑系统</span>
                    </div>

                    <div className="header-info">
                        <span onClick={() => props.history.push('/edit')}>发帖</span>
                        <div >
                            {/* 点击退出登录，查看个人信息 */}
                            <img src={img} className="header-info-img" />
                        </div>
                    </div>
                </div>

            </Header>
            <Content className="content">
                <div className="main" style={{ display: 'flex' }}>
                    <div className="container" style={{ flex: '0 0 70%', maxWidth: '70%' }}>
                        {props.children}
                    </div>
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
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </ Layout >
    )
}

export default withRouter(Frame);
