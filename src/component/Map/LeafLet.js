import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import LeafLetAMap from './../LeafLet/LeafLetAMap'
import LeafLetGISServerMap from './../LeafLet/LeafLetGISServerMap'
import LeafLetOnTDTMap from './../LeafLet/LeafLetOnTDTMap'
import LeafLetOnGoogeMap from './../LeafLet/LeafLetOnGoogeMap'
import LeafLetOffTDTMap from './../LeafLet/LeafLetOffTDTMap'

export default class LeafLet extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <div>
                    <ul>
                        <li><Link to="/LeafLet/LeafLetAMap">LeafLetAmap</Link></li>
                        <li><Link to="/LeafLet/LeafLetGISServerMap">LeafLetGISServerMap</Link></li>
                        <li><Link to="/LeafLet/LeafLetOnTDTMap">LeafLetOnTDTMap</Link></li>
                        <li><Link to="/LeafLet/LeafLetOnGoogeMap">LeafLetOnGoogeMap</Link></li>
                        <li><Link to="/LeafLet/LeafLetOffTDTMap">LeafLetOffTDTMap</Link></li>
                    </ul>
                </div>
                <Route path="/LeafLet/LeafLetAMap" component={LeafLetAMap}/> 
                <Route path='/LeafLet/LeafLetGISServerMap' component={LeafLetGISServerMap}/>  
                <Route path='/LeafLet/LeafLetOnTDTMap' component={LeafLetOnTDTMap}/>  
                <Route path='/LeafLet/LeafLetOnGoogeMap' component={LeafLetOnGoogeMap}/>  
                <Route path='/LeafLet/LeafLetOffTDTMap' component={LeafLetOffTDTMap}/>                      
            </div>
        )
    }
}