import React, {Component} from 'react'

import L from 'leaflet';
import esri,{tiledMapLayer} from 'esri-leaflet'; 

export default class LeafNet extends Component{
    constructor(props){
        super(props);
        this.state = {
            leafletMap : {}
        }
    }
    componentDidMount(){
        this.initMap();
    };
    initMap(){      
        console.log(L);
        this.state.leafletMap = L.map("leafMapDiv").setView([31.335,120.591], 16);
        //高德地图
        // L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        //     subdomains: "1234",
        //     attribution: '高德地图'
        //   }).addTo(this.state.leafletMap); 
        let basemap = tiledMapLayer({url:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"}).addTo(this.state.leafletMap);

    }
    render(){
        let style = {
            width: '100%',
            height : '100%'
        }
        return(
            <div>
                <div id="leafMapDiv" style={style}>leafNet</div>
            </div>
        )
    }
}