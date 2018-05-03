import React, {Component} from 'react'

import esriLoader from 'esri-loader'
//import EsriLoader from 'esri-loader-react'

export default class LeafNet extends Component{
    constructor(props){
        super(props);
        this.tiledLayerURL = "http://content.china-ccw.com:5080/arcgis/rest/services/BaseMap/Szdzdt2017_wgs84/MapServer";
    }
    componentDidMount(){
        if(!esriLoader.isLoaded()){
            esriLoader.bootstrap((err) => {
                if(err){
                    console.error(err);
                } else {
                    this.initMap();
                }
            },{
                url : 'https://js.arcgis.com/3.24/'
            })
        }else{
            this.initMap()
        }
    };
    initMap(){
        esriLoader.dojoRequire(["esri/map","esri/layers/ArcGISTiledMapServiceLayer", "esri/geometry/Extent",
        "esri/SpatialReference"],(Map,ArcGISTiledMapServiceLayer,Extent,SpatialReference) => {
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
        })
    }
    render(){
        return(
            <div>
                <div id="mapDiv"></div>
            </div>
        )
    }
}