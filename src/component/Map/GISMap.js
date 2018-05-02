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
/*        let timeStample = new Date().getTime();
        this.state = {
            madDivID :"mapDiv" + timeStample
        }*/
    }
    componentDidMount(){
        this.initMap()
    }
    initMap(){
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
            var extent = new Extent(120.56, 31.28, 120.65, 31.33, new SpatialReference({ wkid: 4326 }))
            let globalMap = new Map('madDivID', {
                center: [120.591, 31.335],
                zoom: 12,
                slider: false,
                //center: new Point(116.46, 39.92),
                //zoom: 10,
                showLabels: true,
                extent: extent,
            });
            var tiledLayer = new ArcGISTiledMapServiceLayer("http://content.china-ccw.com:6080/arcgis/rest/services/sz84_blue/MapServer",{
                id: 'baseMap'
            });
            globalMap.addLayer(tiledLayer);
        })
    }
    render(){
        let mapStyle = {
            height:'100%',
            width:'100%'
        }
        return(
            <div>
                <div id="madDivID" style={mapStyle}>
                </div>
            </div>
        )
    }
}
export default GISMap