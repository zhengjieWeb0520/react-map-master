import React, {Component} from 'react'
import L from 'leaflet';

export default class LeafLetOnGoogeMap extends Component{
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
        this.state.leafletMap = L.map("leafMapDiv").setView([31.335,120.591], 3.5);
        //电子地图
        L.tileLayer("http://www.google.cn/maps/vt/lyrs=m@226000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil", {
            subdomains: []
        }).addTo(this.state.leafletMap);        
        // 影像
/*         L.tileLayer("http://www.google.cn/maps/vt/lyrs=s@142&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil", {
            subdomains: []
        }).addTo(this.state.leafletMap); */
        // 标注
        L.tileLayer("http://www.google.cn/maps/vt/lyrs=h@177000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil", {
            subdomains: []
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