/**
 * Created by Administrator on 2018/4/19.
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import GIS3DMap from "../Map/GIS3DMap";

class Header extends Component{

    render(){
        return(
            <header>
                <nav>
                    <ul>
                        <li><Link to="/" >GISMap</Link></li>
                        <li><Link to="/BMap">BMap</Link></li>
                        <li><Link to="/AMap">AMap</Link></li>
                        <li><Link to="/Echarts">Echarts</Link></li>
                        <li><Link to="/LeafLet">LeafLet</Link></li>
                        <li><Link to="/ES6">ES6</Link></li>
                        <li><Link to="/GIS3DMap">GIS3DMap</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}
export default Header