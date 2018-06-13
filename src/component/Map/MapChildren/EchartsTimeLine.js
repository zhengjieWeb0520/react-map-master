// import React ,{Component} from 'react';
//
// import echarts from 'echarts/lib/echarts';
// import Echarts from '../Echarts';
//
//
// export default class EchartsTimeLine extends Component{
//     componentDidMount(){
//         this.initEchar()
//     }
//     initEchar(){
//         var TimeLineChart = echarts.init(document.getElementById("EchartsTimeLineContent"));
//         function randomData() {
//             now = new Date(+now + oneDay);
//             value = value + Math.random() * 21 - 10;
//             return {
//                 name: now.toString(),
//                 value: [
//                     [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
//                     Math.round(value)
//                 ]
//             }
//         }
//
//         var data = [];
//         var now = +new Date(1997, 9, 3);
//         var oneDay = 24 * 3600 * 1000;
//         var value = Math.random() * 1000;
//         for (var i = 0; i < 1000; i++) {
//             data.push(randomData());
//         }
//
//         var option = {
//             title: {
//                 text: '动态数据 + 时间坐标轴'
//             },
//             tooltip: {
//                 trigger: 'axis',
//                 formatter: function (params) {
//                     params = params[0];
//                     var date = new Date(params.name);
//                     return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
//                 },
//                 axisPointer: {
//                     animation: false
//                 }
//             },
//             xAxis: {
//                 type: 'time',
//                 splitLine: {
//                     show: false
//                 }
//             },
//             yAxis: {
//                 type: 'value',
//                 boundaryGap: [0, '100%'],
//                 splitLine: {
//                     show: false
//                 }
//             },
//             series: [{
//                 name: '模拟数据',
//                 type: 'line',
//                 showSymbol: false,
//                 hoverAnimation: false,
//                 data: data
//             }]
//         };
//         TimeLineChart.setOption(option)
//         setInterval(function () {
//
//             for (var i = 0; i < 5; i++) {
//                 data.shift();
//                 data.push(randomData());
//             }
//
//             TimeLineChart.setOption({
//                 series: [{
//                     data: data
//                 }]
//             });
//         }, 1000);
//     }
//     render(){
//         var ContentStyle = {
//             width:'600px',
//             height:'400px'
//         }
//         return(
//             <div id="EchartsTimeLine">
//                 <div id="EchartsTimeLineContent" style={ContentStyle}>
//                 </div>
//             </div>
//         )
//     }
// }