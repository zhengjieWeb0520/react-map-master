import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import LeafLetAMap from './../LeafLet/LeafLetAMap'
import LeafLetGISServerMap from './../LeafLet/LeafLetGISServerMap'
import LeafLetGISTiledMap from './../LeafLet/LeafLetGISTiledMap'

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
                        <li><Link to="/LeafLet/LeafLetGISTiledMap">LeafLetGISTiledMap</Link></li>
                    </ul>
                </div>
                <Route path="/LeafLet/LeafLetAMap" component={LeafLetAMap}/> 
                <Route path='/LeafLet/LeafLetGISServerMap' component={LeafLetGISServerMap}/>  
                <Route path='/LeafLet/LeafLetGISTiledMap' component={LeafLetGISTiledMap}/>                       
            </div>
        )
    }
}