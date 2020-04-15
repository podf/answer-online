import React from 'react';
import { Layout, Menu, Card } from 'antd';
import './index.css';
import { Route, withRouter, Switch, HashRouter as Router } from 'react-router-dom';
import img from '../../../src/img/bg.jpg';
import Aside from '../Aside';
import Edit from '../Article/Edit';
import List from '../Article/List';
import Article from '../Article';
import UserInfo from '../User/UserInfo';


const { Header, Content, Footer } = Layout;


function Home(props) {
    return (
        <Router>
            <Layout style={{
                maxWidth: 1100,
                height: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
            }} >
                <Header className="headerBar">
                    <div className="header-content">
                        <div className="header-logo" onClick={() => { props.history.push('/home') }}>
                            <span className="iconfont icon-xuexi header-icon"></span>
                            <span>在线答疑系统</span>
                        </div>

                        <div className="header-info">
                            <span onClick={() => props.history.push('/home/edit')}>发帖</span>
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
                            <Route exact path="/home/" component={List} />
                            <Route exact path="/home/edit" component={Edit} />
                            <Route path="/home/article/:id" component={Article} />
                            <Route path="/home/setting" component={UserInfo} />
                        </div>
                        <Route path="/home/" component={Aside} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </ Layout >
        </Router>
    )
}

export default withRouter(Home);
