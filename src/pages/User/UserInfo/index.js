import React, { useState, useEffect } from 'react'
import {
    Input,
    Button,
    message,
} from 'antd';

import { get, post } from '../../../utils/request';

import './userInfo.css';

const { TextArea } = Input;

function UserInfo() {
    const [name, setName] = useState('');
    const [sign, setSign] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [info, setInfo] = useState('');
    const [userInfo, setUserInfo] = useState();

    const userId = localStorage.getItem('userId');
    const userLabel = ['用户名', '标签', '电话', '电子邮箱', '简介', ''];

    const getData = async () => {
        const res = await get(`/user/info/${userId}`);
        const { username, sign, phone, email, info } = res.info;
        setName(username);
        setSign(sign);
        setPhone(phone);
        setEmail(email);
        setInfo(info);
        setUserInfo({ username, sign, phone, email, info });
    }

    useEffect(() => {
        getData();
    }, []);


    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleSign = (e) => {
        setSign(e.target.value);
    }

    const handlePhone = (e) => {
        setEmail(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleInfo = (e) => {
        setInfo(e.target.value);
    }

    const isNotSafe = () => {
        const data = { name, sign, phone, email, info }
        const haveNullData = Object.keys(data).find(item => !data[item])
        return haveNullData;
    }

    const modifyInfo = async () => {
        if (isNotSafe()) {
            message.error('请完善数据哦！');
            return
        }
        const { code } = await post('/user/info/', { userId, username: name, sign, phone, email, info });
        if (code === 0) {
            message.success('更新成功');
        }
    }


    return (
        <div div className="userinfo-box" >
            <div className={'userinfo-label'}>
                {
                    userLabel.map(item => <div className={'userinfo-label-item'}>{item}{item && <span className="userinfo-label-require">*</span>}</div>)
                }
            </div>
            <div className='userinfo-target'>
                <Input value={name} onChange={handleName} className={'userinfo-target-item'} />
                <Input value={sign} onChange={handleSign} className={'userinfo-target-item'} />

                <Input value={phone} onChange={handlePhone} className={'userinfo-target-item'} />
                <Input value={email} onChange={handleEmail} className={'userinfo-target-item'} />
                <TextArea rows={4} value={info} onChange={handleInfo} className={'userinfo-target-item'} />
                <div style={{ width: '100%' }}>
                    <Button type="primary" onClick={modifyInfo} htmlType="submit" style={{ float: "right" }}>
                        修改
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;
