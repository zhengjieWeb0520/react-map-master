/**
 * Created by Administrator on 2018/4/19.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import esriLoader  from 'esri-loader';
import EsriLoader from 'esri-loader-react';

// import echarts from 'echarts/lib/echarts';
// import 'echarts/map/js/china';
// import 'echarts/lib/chart/map';

class GISMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            globalMap : {}
        };
        this.tiledLayerURL = "http://content.china-ccw.com:5080/arcgis/rest/services/BaseMap/Szdzdt2017_wgs84/MapServer";
        this.FeatureLayerURL = "http://content.china-ccw.com:7080/arcgis/rest/services/SZHB263/XZQH_WGS84/MapServer/1";
        this.DynamicLayerURL = "http://content.china-ccw.com:7080/arcgis/rest/services/SZHB263/XZQH_WGS84/MapServer";
    }
    componentDidMount(){
        this.initMap();
    }
    // 初始化地图
    initMap(){
        let _this = this;
        const mapOptions = {
            url : 'https://js.arcgis.com/3.24/'
        }
        esriLoader.loadModules(["esri/map",
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/layers/ArcGISDynamicMapServiceLayer",
            "esri/geometry/Extent",
            "esri/SpatialReference",
            //"widgets/customLayer/EChartsLayer",
            "dojo/on",
            "dojo/domReady!"],mapOptions).then(([Map, ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer,
                                                       Extent, SpatialReference,/*EChartsLayer,*/on])=>{
            let extent = new Extent(113.56, 28.28, 125.65, 33.33, new SpatialReference({ wkid: 4326 }))
            this.state.globalMap = new Map('madDivID', {
                center: [120.591, 31.335],
                zoom: 0,
                slider: false,
                //center: new Point(116.46, 39.92),
                //zoom: 10,
                showLabels: true,
                extent: extent,
            });
            let tiledLayer = new ArcGISTiledMapServiceLayer(this.tiledLayerURL,{
                id: 'baseMap'
            });
            this.state.globalMap.addLayer(tiledLayer);
            this.state.globalMap.on('load',()=>{
                this.state.globalMap.graphics.enableMouseEvents();
                //显示鼠标移入的经纬度
                this.state.globalMap.on("mouse-move",(e)=>{
                    ReactDOM.render((<div><span>经度:</span><span>{e.mapPoint.x}</span>&nbsp;&nbsp;<span>纬度:</span><span>{e.mapPoint.y}</span></div>),document.getElementById("CorInfo"))
                })
            })
        })
    }
    //添加FeatureLayer图层
    addFeatureLayer(){
        esriLoader.loadModules(["esri/map","esri/layers/FeatureLayer"]).then(([Map,FeatureLayer])=>{   
            let displayLayer = this.state.globalMap.getLayer("carton");
            if(displayLayer)  {
                displayLayer.show();
            }else{
                let featureLayerOptions = {
                    id : 'carton',
                    mode: FeatureLayer.MODE_AUTO,
                    outFields: ["*"],
                };
                displayLayer = new FeatureLayer(this.FeatureLayerURL,featureLayerOptions);
                this.state.globalMap.addLayer(displayLayer);
            }
        })
    }
    //隐藏FeatureLayer图层
    removeFeatureLayer(){
        let display = this.state.globalMap.getLayer('carton');
        if(display !== null)
        display.hide();
    }
    //添加DynamicLayer图层
    addDynamicLayer(){
        esriLoader.loadModules(["esri/layers/ArcGISDynamicMapServiceLayer"]).then(([ArcGISDynamicMapServiceLayer]) => {
            let displayLayer = new ArcGISDynamicMapServiceLayer(this.DynamicLayerURL,{
                id : "cartonLayer"
            })
            this.state.globalMap.addLayer(displayLayer);
            console.log(this.state.globalMap);
        })
    }
    //移除Dynamic图层
    removeDynamicLayer(){
        let display = this.state.globalMap.getLayer("cartonLayer");
        if(display !== null)
        this.state.globalMap.removeLayer(display);
    }
    //清除所有图层
    removeAllLayer(){
        let layersArray = this.state.globalMap.layerIds
        console.log(layersArray);
        layersArray.forEach((layer) => {
            if(layer != "baseMap"){
                let display = this.state.globalMap.getLayer(layer);
                this.state.globalMap.removeLayer(display)
            }
        })
    }
    render(){
        let mapStyle = {
            height:'100%',
            width:'100%'
        }
        return(
            <div>
                <div>
                    <button onClick={this.addFeatureLayer.bind(this)}>添加FeatureLayer图层</button>
                    <button onClick={this.removeFeatureLayer.bind(this)}>移除FeatureLayer图层</button>
                    <button onClick={this.addDynamicLayer.bind(this)}>添加DynamicLayer图层</button>
                    <button onClick={this.removeDynamicLayer.bind(this)}>移除DynamicLayer图层</button>
                    <button onClick={this.removeAllLayer.bind(this)}>清除所有图层</button>
                </div>
                <div id="madDivID" style={mapStyle}>
                </div>
                <div id="CorInfo"></div>
            </div>
        )
    }
}
export default GISMap