import React, { Component } from 'react';
import echarts from "echarts";

class EchartsTest extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main_'));
        // 绘制图表
        myChart.setOption({
            tooltip: {},
            legend: {
                data: ["公司所拥有车辆总数", "公司所拥有车辆行驶中总数"],
                bottom: "12"
              },
            xAxis: {
                data: ["公司1", "公司2", "公司3", "公司4", "公司5", "公司6"]
            },
            yAxis: {},
            series: [
                {
                name: '公司所拥有车辆总数',
                type: 'bar',
                stack: "车辆",
                data: [5, 20, 36, 10, 10, 20]
            },
            {
                name: '公司所拥有车辆行驶中总数',
                type: 'bar',
                stack: "车辆",
                data: [15, 30, 10, 50, 15, 30]
            }
        ]
        });
    }
    render() {
        return (
            <div id="main_" style={{ width: 350, height: 280 }}></div>
        );
    }
}

export default EchartsTest;
