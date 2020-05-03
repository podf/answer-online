
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import { Route, withRouter, Switch, HashRouter as Router } from 'react-router-dom';

import './index.css';

const { Header, Sider, Content } = Layout;

const Frame = (props) => {
    const [collapsed, setCollapsed] = useState();

    const toggle = () => {
        setCollapsed(!collapsed);
    }

    return (
        <Layout className="adminFrameBox">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="adminFrameLogo">
                    <span className="iconfont icon-xuexi header-icon"></span>
                    <span>在线答疑系统</span>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />} onClick={() => props.history.push('/admin/article')}>
                        文章管理
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={() => props.history.push('/admin/user')}>
                        用户管理
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />} onClick={() => props.history.push('/admin/announcement')}>
                        发布公告
                    </Menu.Item>
                    <Menu.Item key="4" icon={<UploadOutlined />} onClick={() => props.history.push('/admin/data')}>
                        数据清除
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })} */}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
        </Layout >
    );
}

export default withRouter(Frame);
