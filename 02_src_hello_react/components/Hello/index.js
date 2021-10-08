import React,{Component} from 'react'
import hello from './index.module.css'
// 樣式模塊化：只要為 css文件加上 module，所有 hello 相關的樣式都會保留在 hello 這個對象裡面 - 接上變量 hello， import hello from './index.module.css'
// 接上之後會自動幫你換成對象，直接寫上 className={hello.title} 就可以

// 所以換成寫 className={hello.title} 就不會跟 Welcome  的同名css產生衝突

export default class Hello extends Component{
    render(){
        return <h2 className={hello.title}>Hello,React!</h2>
    }
}