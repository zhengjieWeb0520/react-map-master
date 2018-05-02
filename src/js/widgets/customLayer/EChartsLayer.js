/*****************************************************************************************************
 *
 * Copyright (C) 2010-2016, YL Wisdom Co.,Ltd.,All Rights Reserved.
 *
 *****************************************************************************************************
 * FileName:EChartsLayer.js
 * Create Date: 2016-08-03
 * Author：Jason Young
 * E-Mail:genyong.yang@gmail.com
 * Description:EChartLayer主类扩展
 *****************************************************************************************************/
define(["dojo/_base/declare",
        "dojo/_base/lang",
        "./EMapCoordSys",
        "esri/geometry/Point",
        "esri/geometry/ScreenPoint"],
    function (declare, lang, EMapCoordSys, Point, ScreenPoint) {
        return declare("EChartLayer", null, {
            name: "EChartLayer",
            _emap: null,
            _echarts: null,
            _option: null,
            _ecInstance:null,
            _echartsContainer:null,
            /*
             * @emap emap instance
             * @api api functions intance
             */
            constructor: function (emap, ec) {
                this._emap = emap || {};
                this._echarts = ec || {};
                this._init();


                this.registerCoordSys(this._emap, this._echarts);
                this.extendComponentModel();
                this.extendComponentView();
                this.registerAction();
            },
            _init:function(){
                var echartsDiv = this._echartsContainer = document.createElement("div");
                echartsDiv.style.position = "absolute";
                echartsDiv.style.height = this._emap.height + "px";
                echartsDiv.style.width = this._emap.width + "px";
                echartsDiv.style.top = 0;
                echartsDiv.style.left = 0;
                this._emap.__container.appendChild(echartsDiv);
            },
            getEchartsContainer: function () {
                return this._echartsContainer;
            },
            initECharts: function () {
                this._ecInstance = this._echarts.init.apply(this, arguments);

                //self._bindEvent();
                return this._ecInstance;
            },
            setOption : function (option, notMerge) {
                this._option = option;
                this._ecInstance.setOption(option, notMerge);
            },
            registerCoordSys: function (emap,echarts) {
                var coordSys = new EMapCoordSys(emap, echarts);
                this._echarts.registerCoordinateSystem('emap', coordSys);
            },
            v2Equal:function (a, b) {
	            return a && b && a[0] === b[0] && a[1] === b[1];
            },
            extendComponentModel: function () {
                var self = this;
                this._echarts.extendComponentModel({
                    type: 'emap',

                    getEMap: function () {
                        // __bmap is injected when creating BMapCoordSys
                        return this.__emap;
                    },

                    setCenterAndZoom: function (center, zoom) {
                        this.option.center = center;
                        this.option.zoom = zoom;
                    },

                    centerOrZoomChanged: function (center, zoom) {
                        var option = this.option;
                        return !(self.v2Equal(center, option.center) && zoom === option.zoom);
                    },

                    defaultOption: {

                        //center: [120.591, 31.335],

                        //zoom: 11,

                        //mapStyle: {},

                        roam: false
                    }
                });
            },
            extendComponentView: function () {
                var self = this;
                this._echarts.extendComponentView({
                    type: 'emap',
                    render: function (eMapModel, ecModel, api) {
                        var rendering = true;

                        var emap = eMapModel.getEMap();
                        var viewportRoot = api.getZr().painter.getViewportRoot();
                        var coordSys = eMapModel.coordinateSystem;
                        var moveHandler = function (type, target) {
                            if (rendering) {
                                return;
                            }
                            var offsetEl = viewportRoot.parentNode.parentNode.parentNode;
                            var mapOffset = [
                                -parseInt(offsetEl.style.left, 10) || 0,
                                -parseInt(offsetEl.style.top, 10) || 0
                            ];
                            viewportRoot.style.left = mapOffset[0] + 'px';
                            viewportRoot.style.top = mapOffset[1] + 'px';

                            coordSys.setMapOffset(mapOffset);
                            eMapModel.__mapOffset = mapOffset;

                            api.dispatchAction({
                                type: 'emapRoam'
                            });
                        };

                        function zoomEndHandler() {
                            if (rendering) {
                                return;
                            }
                            api.dispatchAction({
                                type: 'emapRoam'
                            });
                        }

                        var mapZoomEndEvent;
                        var mapPanEvent;
                        if (mapPanEvent) {
                            mapPanEvent.remove();
                        }
                        if(mapZoomEndEvent){
                            mapZoomEndEvent.remove();
                        }
                        mapPanEvent=emap.on('pan-end', moveHandler);
                        mapZoomEndEvent=emap.on('zoom-end', zoomEndHandler);

                        var roam = eMapModel.get('roam');
                        if (roam && roam !== 'scale') {
                            emap.disableScrollWheelZoom();
                            emap.disableDoubleClickZoom();
                            emap.disablePan();
                        }
                        
                        rendering = false;
                    }
                });
            },
            registerAction: function () {
                this._echarts.registerAction({
                    type: 'emapRoam',
                    event: 'emapRoam',
                    update: 'updateLayout'
                }, function (payload, ecModel) {
                    ecModel.eachComponent('emap', function (eMapModel) {
                        var emap = eMapModel.getEMap();
                        var center = emap.extent.getCenter();
                        eMapModel.setCenterAndZoom([center.x, center.y], emap.getZoom());
                    });
                });
            },
            _bindEvent: function () {
                var self = this;
                self._emap.on("zoom-end", function (e) {
                    self._ecInstance.resize();
                    //self._echartsContainer.style.visibility = "visible";
                });
                self._emap.on("zoom-start", function (e) {
                    //self.refresh();
                    //self._echartsContainer.style.visibility = "hidden";
                });
                self._emap.on("pan", function (e) {
                    //self.refresh();
                    //self._ecInstance.resize();
                    //self._echartsContainer.style.visibility = "hidden";
                });
                self._emap.on("pan-end", function (e) {
                    self._ecInstance.resize();
                    //self._echartsContainer.style.visibility = "visible";
                });
                self._emap.on("resize", function () {
                    var e = self._echartsContainer.parentNode.parentNode.parentNode;
                    self._mapOffset = [-parseInt(e.style.left) || 0, -parseInt(e.style.top) || 0];
                    self._echartsContainer.style.left = self._mapOffset[0] + "px";
                    self._echartsContainer.style.top = self._mapOffset[1] + "px";
                    setTimeout(function () {
                        self._emap.resize();
                        self._emap.reposition();
                        self._ecInstance.resize();
                    }, 200);
                    self._echartsContainer.style.visibility = "visible";
                });
                self._ecInstance.getZr().on("dragstart", function (e) { });
                self._ecInstance.getZr().on("dragend", function (e) { });
                self._ecInstance.getZr().on("mousewheel", function (e) {
                    self._lastMousePos = self._emap.toMap(new ScreenPoint(e.event.x, e.event.y));
                    var t = e.wheelDelta;
                    var n = self._emap;
                    var a = n.getZoom();
                    var t = t > 0 ? Math.ceil(t) : Math.floor(t),
				    t = Math.max(Math.min(t, 4), -4);
                    t = Math.max(n.getMinZoom(), Math.min(n.getMaxZoom(), a + t)) - a;
                    self._delta = 0;
                    self._startTime = null;
                    t && n.setZoom(a + t);
                });
				
            },

            
    
        });
    });