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
        varietyData: [
          {
            name: "历史",
            value: 32034,
          },
          {
            name: "哲学",
            value: 29397,
          },
          {
            name: "艺术",
            value: 14360,
          },
          {
            name: "文学",
            value: 91292,
          },
          {
            name: "自然科学",
            value: 13499,
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
        orderData: [
          {
            date: "2023-09",
            data1: 160,
            data2: 54,
            data3: 162,
            data4: 0,
            data5: 54,
            //33
          },
          {
            date: "2023-10",
            data1: 234,
            data2: 42,
            data3: 69,
            data4: 0,
            data5: 17,
            //40
          },
          {
            date: "2023-11",
            data1: 347,
            data2: 0,
            data3: 91,
            data4: 53,
            data5: 0,
            //47
          },
          {
            date: "2023-12",
            data1: 181,
            data2: 50,
            data3: 0,
            data4: 69,
            data5: 79,
            //42,
          },
          {
            date: "2024-01",
            data1: 232,
            data2: 106,
            data3: 0,
            data4: 68,
            data5: 21,
          },
          {
            date: "2024-02",
            data1: 538,
            data2: 251,
            data3: 131,
            data4: 81,
            data5: 25,
            //1400
          },
        ],
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
