import React, {Component} from 'react'
import './../../CSS/sass/ESsass.scss'

export default class ES6 extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        //模板字符串
        let name = 'zhengjie'
        let value = 'React App'
        console.log(`hello ${name}, 欢迎学习 ${value}`);

        //箭头函数
        const hello = (name) => {
            console.log(`hello ${name}`);
        }
        hello("React")

        setTimeout(()=>{
            console.log('xxxx')
        },1000)

        const double = x => x*2;
        console.log(double(5))
        //函数默认参数
        const hello1 = (name = 'vue') =>{
            console.log(`hello ${name}`)
        }
        hello1();

        //展开符
        const hello2 = (name,value) =>{
            console.log(`hello ${name}, 学习好 ${value}`);
        }
        let arr = ['Janms','React']
        hello2(...arr)

        //对象
        let obj = {
            name:'James',
            value : 'React'
        }
        console.log(Object.keys(obj))
        console.log(Object.values(obj))
        console.log(Object.entries(obj))

        const name1 = 'imooc'
        const obj2={
            name1,
            [name]:'hello',
            hello(){

            }
        }
        console.log(obj2)

        //对象扩展
        const obj3 = {type:'IT',name3:'woniu'}
        console.log({...obj, obj3, data:"2018"});

        const array = ['hello', 'imooc']
        let [arg1, arg2] = array

        const {type, name3} = obj3
        console.log(type, '|', name3);


    }
    render(){
        return(
            <div>
                ES6
                <div className="aa">
                    <div className="bb"></div>
                </div>
            </div>
        )
    }
}