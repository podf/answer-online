import React, { useState, useEffect } from "react";
import { Card } from "antd";

import "./rankingList.css";
// import "../../../public/iconfont";

import { get } from "../../../utils/request";

function RankingList() {
  const [topStarList, setTopStarList] = useState([]);

  useEffect(() => {
    get("/ranking").then((res) => {
        console.log(res.rankingList, 'res')
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
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default RankingList;
