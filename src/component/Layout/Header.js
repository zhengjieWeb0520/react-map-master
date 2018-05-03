/**
 * Created by Administrator on 2018/4/19.
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
                        <li><Link to="/LeafNet">LeafNet</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}
export default Header