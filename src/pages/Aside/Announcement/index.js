import React, { useState, useEffect } from "react";
import { Card } from "antd";

import { get } from "../../../utils/request";

function Announcement() {
    const [info, setInfo] = useState();

    useEffect(() => {
        get('/announcement').then((res) => {
            setInfo((res.announcement && res.announcement.describe) || '');
        });
    }, []);

    return (
        <Card title="公告" bordered={false}>
            {info}
        </Card>
    );
}

export default Announcement;
