/**
 * Created by Administrator on 2018/4/19.
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import esriLoader  from 'esri-loader';
import EsriLoader from 'esri-loader-react';

import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china';
import 'echarts/lib/chart/map';

class GISMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            globalMap : {}
        }
    }
    componentDidMount(){
        this.initMap();
        this.tiledLayerURL = "";
        this.FeatureLayerURL = "";
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
            let extent = new Extent(120.56, 31.28, 120.65, 31.33, new SpatialReference({ wkid: 4326 }))
            this.state.globalMap = new Map('madDivID', {
                center: [120.591, 31.335],
                zoom: 12,
                slider: false,
                //center: new Point(116.46, 39.92),
                //zoom: 10,
                showLabels: true,
                extent: extent,
            });
            this.state.globalMap.on('load',()=>{
                this.state.globalMap.graphics.enableMouseEvents();
            })
            let tiledLayer = new ArcGISTiledMapServiceLayer(this.tiledLayerURL,{
                id: 'baseMap'
            });
            this.state.globalMap.addLayer(tiledLayer);
        })
    }
    //添加FeatureLayer图层
    addFeatureLayer(){
        esriLoader.loadModules(["esri/map","esri/layers/FeatureLayer"]).then(([Map,FeatureLayer])=>{           
            let featureLayerOptions = {
                id : 'carton',
                mode: FeatureLayer.MODE_AUTO,
                outFields: ["*"],
            };
            var cartonFeatureLayer = new FeatureLayer(this.FeatureLayerURL,featureLayerOptions);
            this.state.globalMap.addLayer(cartonFeatureLayer);
        })
    }
    //移除图层
    removeLayer(){
        //esriLoader.loadModules(["esri/map"]).then(([Map]) =>{
            let display = this.state.globalMap.getLayer('carton');
            if(display !== null)
            display.clear();
        //})
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
                    <button onClick={this.removeLayer.bind(this)}>移除图层</button>
                </div>
                <div id="madDivID" style={mapStyle}>
                </div>
            </div>
        )
    }
}
export default GISMap