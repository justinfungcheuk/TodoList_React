import React, { Component } from 'react'
import PropTypes from 'prop-types' // 引入 prop-types 對接收的 props 進行：類型，以及必要性的限制
import {nanoid} from 'nanoid' 
// 所安裝的 nanoid，它裡面用了分別暴露的形式就暴露了nanoid出來，而這個 nanoid 是一個函數，當你每一次去調用 nanoid，都會給妳生成一個 字符串，而且這個字符串是全球唯一的
import './index.css'



export default class Header extends Component {
// 對於 App 就是傳遞，對於 Header 就是接收
    // 對接收的 props 進行：類型，以及必要性的限制
    static propTypes = {
        addTodo:PropTypes.func.isRequired // 因為 App 給 Header 傳了 addTodo，而且 addTodo 是一個函數
    }


// 鍵盤事件的回調
// 因為給 input 綁定鍵盤事件，所以要拿到 input 的值，綁定事件的元素 和 你要操作的元素 是同一個元素，所以可以用  (event) 來綁定
    handleKeyUp = (event)=>{ // 綁定事件的元素 和 你要操作的元素 是同一個元素


        // 從 event 身上解構賦值的方式，從 event 身上用 keyCode 和 target，可以用解構賦值的方式，從 event 的身上解構賦值 const {keyCode,target} = event
        // 解構賦值獲取 keyCode, target，因為我們要用到它們兩個
        const {keyCode,target} = event // keyCode 代表你在鍵盤所按的是哪一個鍵
        // 在事件對象的 event 身上，有 keyCode 原生代碼，代表鍵盤上的某一個按鍵的 代碼標識/鍵盤編碼

        // 判斷是否是回車按鍵
        if(keyCode !== 13) return // 13 代表 鍵盤上的 enter 鍵
        // 如果按鍵不是 13 enter鍵，就會 return 停止運行代碼
        // 如果是 enter鍵，就會輸出 input框的值

        // 添加的 todo名字 不能為空
        if(target.value.trim() === ''){ // trim() 代表去掉空格
            // target.value.trim() === '' 代表當輸入的值為空的，會出現下面的 alert('輸入不能為空') 提示
            alert('輸入不能為空')
            return // 當輸入為空時，透過 return 把它攔截，不再運行下面的代碼
        }
        // 準備好一個 todo 對象，因為調用 addTodo 的時候，要求寫一個對象
        const todoObj = {id:nanoid(),name:target.value,done:false} // 因為新添加的一件事，那個 done的初始值 一定為 false，因為該事剛開始還沒做完
        /**
         * id:nanoid() 代表透過 id:nanoid() 生成唯一的 id，不會重複使用同一個 id (前提要先安裝 nanoid - yarn add nanoid)
         * name:target.value 代表是用戶所輸入的任務名稱的值
         * done:false        代表新添加的一件事，那個 done的初始值 一定為 false，因為該事剛開始還沒做完 （因為如果一件事完成了，我們沒必要添加它，所以開始要把該事定義為 false 沒完成）
         * 
         */
        // 透過 id:nanoid() 生成唯一的 id，不會重複使用同一個 id

        //將 todoObj 傳遞給 App
        this.props.addTodo(todoObj) // 因為 App 裡面的 addTodo 要的是一個 todoObj（一個 todo 對象）
        // 調用 this.props.addTodo(todoObj) 的意思是 通知 App，把 todoObj 拿到

        // 清空輸入
        target.value = '' // 把輸入的任務名稱的值清空 


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
                {/**
                 * 當按下 enter，代表你確認，就會把你輸入的任務名稱 = todo名，放到狀態裡面，頁面就會在 List裡列你輸入的 Item，它就出現在頁面。
                 * 所以要先獲得輸入框的值，通過按下 enter 獲取輸入框的值，就可以把有關的值放到狀體啊裡面。List的頁面就會更新你輸入的值。
                 * 因此，要先在 header 裡面綁定一個鍵盤事件 onKeyUp={this.handleKeyUp}
                 * 鍵盤事件都是 onKey 什麼什麼。。。。
                 */}
            </div>
        )
    }
}

/* 如果想要從子組件給予東西到父組件， 必須先通過 App父組件 傳給 Header子組件 一個函數，
而 父組件傳給子組件一個函數，要通過 props 來傳。
然後 子組件 需要給 父組件 傳遞數據的時候，要調用該函數

*/