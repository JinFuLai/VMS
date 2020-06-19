import React, { Component } from 'react';
import echarts from "echarts";

class EchartsTest extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            tooltip: {},
            legend: {
                data: ["数据接受", "报警信息"],
                bottom: "12"
              },
            xAxis: {
                data: ["9/1", "9/2", "9/3", "9/4", "9/5", "9/6"]
            },
            yAxis: {},
            series: [
                {
                name: '数据接受',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            },
            {
                name: '报警信息',
                type: 'line',
                data: [15, 30, 10, 50, 15, 30]
            }
        ]
        });
    }
    render() {
        return (
            <div id="main" style={{ width: 350, height: 250 }}></div>
        );
    }
}

export default EchartsTest;
