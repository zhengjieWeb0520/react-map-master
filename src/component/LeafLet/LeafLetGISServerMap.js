import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import {tiledMapLayer,dynamicMapLayer,featureLayer} from 'esri-leaflet';

import imgURL from './../../imgers/imglayer.jpg'
export default class LeafLetGISServerMap extends Component{
    constructor(props){
        super(props)
        this.state = {
            leafletMap : {}
        }
        this.dynamicLayer = {}
        this.featureLayer = {}
        this.imgLayer = {}
        this.tiledURL = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
        this.FeatureLayerURL = "http://content.china-ccw.com:7080/arcgis/rest/services/SZHB263/XZQH_WGS84/MapServer/1";
        this.DynamicLayerURL = "http://content.china-ccw.com:7080/arcgis/rest/services/SZHB263/XZQH_WGS84/MapServer";
        this.imgURL = "http://localhost/EsriSample/imglayer.jpg";
    }
    componentDidMount(){
        this.initMap();
    }
    //初始化地图
    initMap(){
        this.state.leafletMap = L.map("leafMapDiv").setView([31.335,120.591], 16);
        let basemap = tiledMapLayer({
            url:this.tiledURL
        }).addTo(this.state.leafletMap);
        this.state.leafletMap.on('mousemove',this.showMapCoordinate)
    }
    //鼠标移入显示当前坐标
    showMapCoordinate(e){
        ReactDOM.render((<div><span>经度:</span><span>{e.latlng.lng}</span>&nbsp;&nbsp;<span>纬度:</span><span>{e.latlng.lat}</span></div>),document.getElementById("CorInfo"))
        //var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(_this);
    }
    //加载FeatureLayer
    addFeatureLayer(){
        if(this.state.leafletMap.hasLayer(this.featureLayer))
        {
            this.state.leafletMap.removeLayer(this.featureLayer)
        }
        this.featureLayer = featureLayer({
            id : 'cartonFeature',
            url: this.FeatureLayerURL
        });
        this.state.leafletMap.addLayer(this.featureLayer);

    }
    //移除FeatureLayer
    removeFeatureLayer(){
        if(this.state.leafletMap.hasLayer(this.featureLayer))
        {
            this.state.leafletMap.removeLayer(this.featureLayer) 
        }
    }
    //加载DynamicLayer
    addDynamicLayer(){
        if(this.state.leafletMap.hasLayer(this.dynamicLayer))
        {
            this.state.leafletMap.removeLayer(this.dynamicLayer) 
        }
        this.dynamicLayer = dynamicMapLayer({
            id:'cartonDynamic',
            url: this.DynamicLayerURL,
            opacity : 0.25
        });
        this.state.leafletMap.addLayer(this.dynamicLayer)
        console.log(this.state.leafletMap);
    }
    //移除DynamicLayer
    removeDynamicLayer(){
        if(this.state.leafletMap.hasLayer(this.dynamicLayer))
        {
            this.state.leafletMap.removeLayer(this.dynamicLayer) 
        }
    }
    //添加ImageLayer
    addImagecLayer(){
        let imgURL = this.imgURL;
        let imageBounds = [[60,150],[1,60]];
        this.imgLayer = L.imageOverlay(imgURL,imageBounds);
        this.state.leafletMap.addLayer(this.imgLayer);
        console.log(this.state.leafletMap);
    }
    //移除ImageLayer
    removeImageLayer(){
        if(this.state.leafletMap.hasLayer(this.imgLayer))
        {
            this.state.leafletMap.removeLayer(this.imgLayer) 
        }       
    }
    removeAllLayer(){}
    render(){
        let style = {
            width: '100%',
            height : '95%'
        }
        return(
            <div style={style}>
                <div>
                    <button onClick={this.addFeatureLayer.bind(this)}>添加Feature图层</button>
                    <button onClick={this.removeFeatureLayer.bind(this)}>移除Feature图层</button>
                    <button onClick={this.addDynamicLayer.bind(this)}>添加Dynamic图层</button>
                    <button onClick={this.removeDynamicLayer.bind(this)}>移除Dynamic图层</button>
                    <button onClick={this.addImagecLayer.bind(this)}>添加Image图层</button>
                    <button onClick={this.removeImageLayer.bind(this)}>移除Image图层</button>
                </div>
                <div id="leafMapDiv" style={style}>leafNet</div>
                <div id="CorInfo"></div>
            </div>
        )
    }
}