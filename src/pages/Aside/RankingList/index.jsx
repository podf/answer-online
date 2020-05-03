import React, { useState, useEffect } from "react";
import { Card } from "antd";

import "./rankingList.css";

import { get } from "../../../utils/request";

function RankingList() {
  const [userStar, setUserStar] = useState();
  const [topStarList, setTopStarList] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    get(`/ranking/${userId}`).then((res) => {
      setUserStar(res.userInfo.star);
      setTopStarList(res.rankingList);
    });
  }, []);

  return (
    <Card title="能力值排行" bordered={false}>
      <div className="listBox">
        <div className="rankingList-iconGroup">
          {topStarList.map((item) => {
            return (
              <div className="rankingList-item">
                <span className="iconfont icon-guanjun rankingList-guanjun"></span>
                <span>{item.username}</span>
                <span>{item.star}分</span>
              </div>
            );
          })}
          <myStar>我的能力值：{userStar}分</myStar>
        </div>
      </div>
    </Card>
  );
}

export default RankingList;
