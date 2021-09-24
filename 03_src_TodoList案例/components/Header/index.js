import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'
import './index.css'

export default class Header extends Component {

    // 對接收的 props 進行：類型，必要性的限制
    static propTypes = {
        addTodo:PropTypes.func.isRequired
    }


// 鍵盤事件的回調
// 因為給 input 綁定鍵盤事件，因為要拿到 input 的值來綁定事件的元素，所以可以用  (event) 來綁定
    handleKeyUp = (event)=>{
        // 從 event 身上解構賦值的方式，從 event 身上用 keyCode 和 target 
        // 解構賦值獲取 keyCode, target
        const {keyCode,target} = event
        // 判斷是否是回車按鍵
        if(keyCode !== 13) return
        // 添加的 todo名字 不能為空
        if(target.value.trim() === ''){ // trim 代表去掉空格
            alert('輸入不能為空')
            return // 當輸入為空時，透過 return 把它攔截，不再運行下面的代碼
        }
        // 準備好一個 todo 對象，因為調用 addTodo 的時候，要求寫一個對象
        const todoObj = {id:nanoid(),name:target.value,done:false} // 因為新添加的一件事，那個 done的初始值 一定為 false，因為該事剛開始還沒做完
        // 透過 id:nanoid() 生成唯一的 id

        //將 todoObj 傳遞給 App
        this.props.addTodo(todoObj)

        // 清空輸入
        target.value = ''


    }

    /**
     * Todolist 整體邏輯及交互模型如下：
     * 1. App父組件 存儲了一堆要做的事情，把它傳給了 List子組件
     * 2. 再把 App父組件 傳給了 Header的一個函數，該函數能幹什麼呢？ 它能接收一個 todoObj
     * 3. 然後 Header 在合適的時候調用了當年 App父組件 傳給它的那個函數，然後 把 todoObj 交給了 App父組件
     * 4. App父組件 在拿到了該 todoObj 之後放到自己的狀態裡面，就引起了 App父組件狀態的更改，
     * 5. App父組件的狀態一旦更改了，就會重新 調 App父組件的 render，而 App 裡面的render 一旦重新調用
     * 6. 而由於 list 是它的子組件，就會引發子組件的重新渲染，最後東西就來了
     * 
     */

    render() {
        return (
            <div className="todo-header">
                {/* onKey 綁定鍵盤事件, 而 onKeyUp 代表該按鍵真正的按完了 */}
                {/* handleKeyUp 處理鍵盤的抬起事件 */}
                <input onKeyUp={this.handleKeyUp} type="text" placeholder="請輸入你的任務名稱，按回車鍵確認"/>
            </div>
        )
    }
}

/* 如果想要從子組件給予東西到父組件， 必須先通過 App父組件 傳給 Header子組件 一個函數，
而 父組件傳給子組件一個函數，要通過 props 來傳。
然後 子組件 需要給 父組件 傳遞數據的時候，要調用該函數

*/