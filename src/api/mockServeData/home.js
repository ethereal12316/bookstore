// mock数据模拟
import Mock from "mockjs";

// 图表数据
let List = [];
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0),
        })
      );
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: "小米",
            value: 2999,
          },
          {
            name: "苹果",
            value: 5999,
          },
          {
            name: "vivo",
            value: 1500,
          },
          {
            name: "oppo",
            value: 1999,
          },
          {
            name: "魅族",
            value: 2200,
          },
          {
            name: "三星",
            value: 4500,
          },
        ],
        // 柱状图
        userData: [
          {
            date: "周一",
            new: 5,
            active: 200,
          },
          {
            date: "周二",
            new: 10,
            active: 500,
          },
          {
            date: "周三",
            new: 12,
            active: 550,
          },
          {
            date: "周四",
            new: 60,
            active: 800,
          },
          {
            date: "周五",
            new: 65,
            active: 550,
          },
          {
            date: "周六",
            new: 53,
            active: 770,
          },
          {
            date: "周日",
            new: 33,
            active: 170,
          },
        ],
        // 折线图
        orderData: {
          date: [
            "20191001",
            "20191002",
            "20191003",
            "20191004",
            "20191005",
            "20191006",
            "20191007",
          ],
          data: List,
        },
        tableData: [
          {
            name: "《理想国》",
            todayBuy: "哲学",
            monthBuy: 277,
            totalBuy: 12465,
          },
          {
            name: "《战争的艺术》",
            todayBuy: "历史",
            monthBuy: 213,
            totalBuy: 7029,
          },
          {
            name: "《神曲》",
            todayBuy: "文学",
            monthBuy: 211,
            totalBuy: 11605,
          },
          {
            name: "《达·芬奇密码》",
            todayBuy: "艺术",
            monthBuy: 210,
            totalBuy: 7980,
          },
          {
            name: "《浮士德》",
            todayBuy: "文学",
            monthBuy: 180,
            totalBuy: 6300,
          },
          {
            name: "《基督山伯爵》",
            todayBuy: "文学",
            monthBuy: 164,
            totalBuy: 7708,
          },
        ],
      },
    };
  },
};
