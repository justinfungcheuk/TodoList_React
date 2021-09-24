//創建“外殼”組件App
import React, {Component} from 'react' // 如果是用了這種 React,{Component} 引入形式，這種 'react' 文件用了多種暴露的形式
import Hello from './components/Hello/index'
import Welcome from './components/Welcome/index'

//創建並暴露App組件
export default class App extends Component{
    render(){
        return (
            <div>
                <Hello/>
                <Welcome/>
            </div>
        )
    }
}