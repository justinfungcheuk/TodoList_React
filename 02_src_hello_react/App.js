// App.js 是所有組件的外殼組件
//創建“外殼”組件App
import React, {Component} from 'react' 
// 如果是用了這種 React,{Component} 引入形式，這種 'react' 文件用了多種暴露的形式，也就是可以 分別暴露 或 統一暴露
import Hello from './components/Hello/index'
import Welcome from './components/Welcome/index'
// 由於 Welcome 是後引入的，所以會由 Welcome 的樣式替代 Hello 樣式，如果它們有相同的 css樣式有衝突。

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