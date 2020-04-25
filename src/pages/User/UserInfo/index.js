import React, { useState, useEffect } from 'react'
import {
    Modal,
    Form,
    Input,
    Tooltip,
    Select,
    Button,
    Card,
    message
} from 'antd';
import { get } from '../../../utils/request';
import './userInfo.css';

const { TextArea } = Input;

function UserInfo() {

    const userId = localStorage.getItem('userId');

    const [name, setName] = useState('');
    const [sign, setSign] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [info, setInfo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmLoading, setConfirmLoading] = useState(false);

    const userLabel = ['用户名', '标签', '电话', '电子邮箱', '简介', ''];

    useEffect(async () => {
        const res = await get(`/user/info/${userId}`);
        const { username, sign, phone, email, info } = res.info;
        setName(username);
        setSign(sign);
        setPhone(phone);
        setEmail(email);
        setInfo(info);
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

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const modifyInfo = () => {
        setTimeout(() => {
            setConfirmLoading(true);
        }, 200)
    }


    return (
        <div className="userinfo-box">
            <div className={'userinfo-label'}>
                {
                    userLabel.map(item => <div className={'userinfo-label-item'}>{item}{item && <span className="userinfo-label-require">*</span>}</div>)
                }
            </div>
            <div className='userinfo-target'>
                <Input value={name} onChange={handleName} className={'userinfo-target-item'} />
                {/* <Input value={password} type="password" onChange={handlePassword} className={'userinfo-target-item'} /> */}
                <Input value={sign} onChange={handleSign} className={'userinfo-target-item'} />
                <Input value={phone} onChange={handlePhone} className={'userinfo-target-item'} />
                <Input value={email} onChange={handleEmail} className={'userinfo-target-item'} />
                <TextArea rows={4} value={info} onChange={handleInfo} className={'userinfo-target-item'} />
                <div style={{ width: '100%' }}>
                    <Button type="primary" htmlType="submit" style={{ float: "right" }}>
                        登录
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;
