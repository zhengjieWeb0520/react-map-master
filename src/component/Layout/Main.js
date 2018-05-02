/**
 * Created by Administrator on 2018/4/19.
 */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import GISMap from './../Map/GISMap'
import BMap from './../Map/BMap'
import AMap from './../Map/AMap'
import Echarts from './../Map/Echarts'
class Main extends Component{
    render(){
        return(
            <main>
                <Switch>
                    <Route exact path="/" component={GISMap}/>
                    <Route path="/BMap" component={BMap} />
                    <Route path="/AMap" component={AMap} />
                    <Route path="/Echarts" component={Echarts} />
                </Switch>
            </main>
        )
    }
}

export default Main