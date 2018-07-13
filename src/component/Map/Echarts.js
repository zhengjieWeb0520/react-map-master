import React,{Component} from 'react';
import echarts from 'echarts'
import esriLoader from 'esri-loader'
import 'echarts/lib/chart/map'

export default class Echarts extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.drawEchartsMap()
    }
    componentDidUpdate(){
        this.drawEchartsMap()
    }
    drawEchartsMap(){
        let _this = this;
        const mapURL ={
            url: 'https://js.arcgis.com/3.24/init.js'
        }
        esriLoader.loadModules([
            "esri/map",
            "widgets/EChartsLayer",
            "esri/SpatialReference",
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/layers/ArcGISDynamicMapServiceLayer",
            "esri/geometry/Extent",
            "dojo/domReady!"],mapURL).then(([Map, EChartsLayer,SpatialReference,ArcGISTiledMapServiceLayer,
            ArcGISDynamicMapServiceLayer,Extent])=>{
            let  extent = new Extent(95.56, 36.28, 125.65, 45.33, new SpatialReference({ wkid: 4326 }))
            //定义地图
            let map = new Map('EchartsDiv', {
                logo: false,
                slider: false,
                showLabels: true,
                extent: extent,
                zoom: 4
            });
            //底图
            let tiledLayer = new ArcGISTiledMapServiceLayer("http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer", {
                 id: 'baseMap'
             });
            map.addLayer(tiledLayer);

            map.on('load',function(){
                let echartsObj = echarts;
                let overlay = new EChartsLayer(map, echartsObj);
                let chartsContainer = overlay.getEchartsContainer();
                let myChart
                if (myChart && myChart.dispose) {
                    myChart.dispose();
                }
                myChart = overlay.initECharts(chartsContainer);
                console.log(overlay);
                window.onresize = myChart.resize;

                let geoCoordMap = {
                    '北京': [116.4551,40.2539],
                    '上海': [121.4648,31.2891],
                    '广州': [113.5107,23.2196],
                    "大连":[122.2229,39.4409],
                    "南宁":[108.479,23.1152],
                    "南昌":[116.0046,28.6633],
                    "拉萨": [91.1865,30.1465],
                    "长春": [125.8154,44.2584],
                    "包头":[110.3467,41.4899],
                    "重庆": [107.7539,30.1904],
                    "常州": [119.4543,31.5582]
                };
                let BJData = [
                    [{name:'北京'}, {name:'上海',value:95}],
                    [{name:'北京'}, {name:'广州',value:90}],
                    [{name:'北京'}, {name:'大连',value:80}],
                    [{name:'北京'}, {name:'南宁',value:70}],
                    [{name:'北京'}, {name:'南昌',value:60}],
                    [{name:'北京'}, {name:'拉萨',value:50}],
                    [{name:'北京'}, {name:'长春',value:40}],
                    [{name:'北京'}, {name:'包头',value:30}],
                    [{name:'北京'}, {name:'重庆',value:20}],
                    [{name:'北京'}, {name:'常州',value:10}]
                ]
                console.log(BJData);
                let planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
                let convertData = function (data) {
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        let dataItem = data[i];
                        let fromCoord = geoCoordMap[dataItem[0].name];
                        let toCoord = geoCoordMap[dataItem[1].name];
                        if (fromCoord && toCoord) {
                            res.push({
                                fromName: dataItem[0].name,
                                toName: dataItem[1].name,
                                numValue : dataItem[1].value,
                                coords: [fromCoord, toCoord]
                            });
                        }
                    }
                    return res;
                };
                //设置Line和Point的颜色
                let LineColor =  ['#ff3333','orange','lime','aqua'];
                let series = [];
                [['北京', BJData]].forEach(function (item, i) {
                    series.push({
                            // 设置飞行线
                            name: item[1],
                            type: 'lines',
                            zlevel: 1,
                            coordinateSystem: 'emap',
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0.5,
                                color: '#fff',
                                shadowBlur: 0,
                                symbolSize: 3
                            },
                            lineStyle: {
                                normal: {
                                    color: function(params){
                                        let num = params.data.numValue;
                                        if(num > 75){
                                            return LineColor[0];
                                        }else if(num > 50){
                                            return LineColor[1];
                                        }else if(num > 25){
                                            return LineColor[2];
                                        }else{
                                            return LineColor[3];
                                        }
                                    },
                                    width: 1,
                                    curveness: 0.2
                                }
                            },
                            data: convertData(item[1])
                        },
                        // 设置轨迹线
                        {
                            name: item[0].name,
                            type: 'lines',
                            zlevel: 2,
                            coordinateSystem: 'emap',
                            effect: {
                                show: true,
                                period: 6,
                                trailLength: 0,
                                symbol:planePath,
                                symbolSize: 15
                            },
                            lineStyle: {
                                normal: {
                                    color: function(params){
                                        let num = params.data.numValue;
                                        if(num > 75){
                                            return LineColor[0];
                                        }else if(num > 50){
                                            return LineColor[1];
                                        }else if(num > 25){
                                            return LineColor[2];
                                        }else{
                                            return LineColor[3];
                                        }
                                    },
                                    width: 1,
                                    opacity: 0.6,
                                    curveness: 0.2
                                }
                            },
                            data: convertData(item[1])
                        },
                        {
                            // 设置点
                            name: item[0],
                            type: 'effectScatter',
                            coordinateSystem: 'emap',
                            zlevel: 2,
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            label: {
                                normal: {
                                    show: false,
                                    position: [8,-15],
                                    fontSize:18,
                                    formatter: function(params){
                                        var res = params.value[2];
                                        return res;
                                    }
                                }
                            },
                            symbolSize: function (val) {
                                return val[2] / 20;
                            },
                            itemStyle: {
                                normal: {
                                    color:  function(params){
                                        let num = params.value[2];
                                        if(num > 75){
                                            return LineColor[0];
                                        }else if(num > 50){
                                            return LineColor[1];
                                        }else if(num > 25){
                                            return LineColor[2];
                                        }else{
                                            return LineColor[3];
                                        }
                                    }
                                }
                            },
                            data: item[1].map(function (dataItem) {
                                return {
                                    name: dataItem[1].name,
                                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                                };
                            })
                        });
                });
                let MinigrateOption = {
                    title : {
                        text: '',
                        subtext: '',
                        left: 'center',
                        textStyle : {
                            color: '#fff'
                        }
                    },
                    tooltip : {
                        trigger: 'item',
                        //formatter:function(params){
                        //    console.log(params)
                        //    var res = params.name + '<br/>' + params.value[2];
                        //    return res;
                        //}
                    },
                    legend: {
                        orient: 'vertical',
                        top: 'bottom',
                        left: 'right',
                        data:['北京 Top10', '上海 Top10', '广州 Top10'],
                        textStyle: {
                            color: '#fff'
                        },
                        selectedMode: 'single'
                    },
                    geo: {
                        map: '',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,

                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#404a59'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        }
                    },
                    series: series
                };
                let media = [
                    {
                        query: {minWidth: 1760},
                        option: {
                            title : {
                                textStyle: {
                                    fontSize: 26,
                                }
                            },
                            series: [{
                            },{

                            },{
                                label:{
                                    normal: {
                                        textStyle: {
                                            fontSize: 30,
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        length: 8,
                                        length2: 18
                                    }
                                }}],
                            bmap:{
                                zoom: 5
                            }
                        }
                    },
                    {
                        query: {minWidth: 1500},
                        option: {
                            title : {
                                textStyle: {
                                    fontSize: 26,
                                }
                            },
                            series: [{
                            },{

                            },{
                                label:{
                                    normal: {
                                        textStyle: {
                                            fontSize: 30,
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        length: 8,
                                        length2: 18
                                    }
                                }}],
                            bmap:{
                                zoom: 6
                            }
                        }
                    }
                ]
                overlay.setOption({baseOption:MinigrateOption, media: media})
                map.on('extent-change', function(){
                    myChart.resize();
                    setTimeout(function(){
                        let dom = document.querySelector("#EchartsDiv")
                        if(dom) {
                            let e = document.createEvent("MouseEvents")
                            e.initEvent("click", true, true)
                            dom.dispatchEvent(e)
                        }
                    }, 2000)
                })
            })
        })
    }
    render(){
        let style={
            width: '60%',
            height: '70%'
        }
        return(
            <div id="EchartsDiv" style={style}>
            </div>
        )
    }
} 