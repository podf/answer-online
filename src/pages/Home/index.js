import React, { useState } from 'react';
import { Menu, Dropdown } from 'antd';
import './index.css';
import { Route, withRouter, Switch, HashRouter as Router } from 'react-router-dom';
import img from '../../../src/img/bg.jpg';
import Aside from '../Aside';
import Edit from '../Article/Edit';
import List from '../Article/List';
import Article from '../Article';
import UserInfo from '../User/UserInfo';

function Home(props) {
    const menu = (
        <Menu>
            <Menu.Item>
                <div onClick={() => { props.history.push('/home/setting') }}>
                    个人设置
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => { props.history.push('/login'); localStorage.clear() }}>
                    退出登录
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <Router>
            <div
                style={{
                    maxWidth: 1100,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <header className="headerBar">
                    <div className="header-content">
                        <div className="header-logo" onClick={() => { props.history.push('/home') }}>
                            <span className="iconfont icon-xuexi header-icon"></span>
                            <span>在线答疑系统</span>
                        </div>
                        <div className="header-info">
                            <span onClick={() => props.history.push('/home/edit')}>
                                <span className="iconfont icon-ic_accepted"></span>
                                发帖
                            </span>
                            <div>
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <img src={img} className="header-info-img" />
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="body-content">
                    <div className="main" style={{ display: 'flex' }}>
                        <div className="container" style={{}}>
                            <Route exact path="/home" component={List} />
                            <Route exact path="/home/edit" component={Edit} />
                            <Route path="/home/article/:id" component={Article} />
                            <Route path="/home/setting" component={UserInfo} />
                        </div>
                        <Route path="/home" component={Aside} />
                    </div>
                </div>
                {/* <footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</footer> */}
            </div>
        </Router>
    )
}

export default withRouter(Home);
