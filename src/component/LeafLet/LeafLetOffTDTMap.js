import React, {Component} from 'react'
import L from 'leaflet';

export default class LeafLetOffTDTMap extends Component{
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
        L.tileLayer("http://192.168.1.40:8080/imgS/tdt/map/{z}/{y}/{y}_{x}.png", {
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