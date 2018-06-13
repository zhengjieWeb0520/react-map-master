import React, {Component} from 'react'
import L from 'leaflet';

export default class LeafLetOnTDTMap extends Component{
    constructor(props){
        super(props)
        this.state = {
            leafletMap : {}
        }
    }
    componentDidMount(){
        this.initMap()
    }
    initMap(){
        this.state.leafletMap = L.map("leafMapDiv").setView([31.335,120.591], 3);
        //电子地图vec
        // 影像
        L.tileLayer("http://t{s}.tianditu.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
        }).addTo(this.state.leafletMap);
        // 地名标注
        L.tileLayer("http://t{s}.tianditu.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
        }).addTo(this.state.leafletMap);
        // 边界
        L.tileLayer("http://t{s}.tianditu.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ibo&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
            subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"]
        }).addTo(this.state.leafletMap);
    }
    render(){
        let style = {
            width: '100%',
            height : '95%'
        }
        return(
            <div style={style}>
                <div id="leafMapDiv" style={style}></div>
                <div id="CorInfo"></div>
            </div>
        )
    }
}