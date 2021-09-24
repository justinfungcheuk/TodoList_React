import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'
// 引入包有原則： 第三方的包往上靠，自己的包往下靠，樣式 css 一般放到最後

export default class App extends Component {
// 狀態在那裡，操作狀態的方法就在那裡

    //初始化狀態
    state = {todos:[ // todo 是一個對象，不是一個名字 name， name 只是對象裡面的一個屬性
        {id:'001',name:'吃飯',done:true},
        {id:'002',name:'睡覺',done:true},
        {id:'003',name:'打代碼',done:false},
        {id:'004',name:'逛街',done:true},
    ]}

    //addTodo 用於添加一個 todo，接收的參數是 todo 對象
    addTodo = (todoObj)=>{
        // 所以要先拿到原來的一堆 todo，在原來的一推 todo 的前方，把它們傳過來新的 todoObj
        // 獲取原 todos
        const {todos} = this.state
        // 在 {todos} 的前方， 追加一個 todo
        const newTodos = [todoObj,...todos] // todoObj 代表新傳進來的東西，...todos 代表原來數組的東西
        // 更新狀態, 因為 newTodos需要更新狀態才可以放進去 初始化狀態，把它更新狀態
        this.setState({todos:newTodos}) // 所以需要把加工完的數組 newTodos 放到 todos裡面
    }

    // uodateTodo 用於更新一個 todo 對象
    updateTodo = (id,done)=>{ // id 代表你要改的人是誰，done 代表該東西完成了 還是 沒完成
        // 獲取狀態中的 todos
        const {todos} = this.state
        // 匹配處理數據,如果是一樣的就把你更改
        const newTodos = todos.map((todoObj)=>{ // 拿到的每一個項目為 todoObj
            // 如果當前的 todoObj 身上的 id 和 我們傳過來的 id 是一樣的，就代表它們匹配上了
            // 匹配後了， 我們需要返回 todoObj的值 和 更改done值
            // return {...todoObj,done} 也就是代表當匹配上了， 就會返回了一個新的對象，而裡面的 done值會被更改
            if(todoObj.id === id) return {...todoObj,done}
            else return todoObj // 如果沒有匹配上，你原來是什麼就是什麼 return todoObj
        })
        // 更改狀態裡面的 todos，更改為新的 newTodos，而新和舊的差別在於某一個 id 的 todo，更改了它的 done值
        this.setState({todos:newTodos})
    }

    /* 總結上方的 addTodo 用處：
    只要傳遞一個 todoObj 對象，而該對象包含了 id，name 以及 該事件是否完成的 done，就可以把 todoObj 放進去 todos數組 裡面
    而且是放到列表的最前方
    所以 addTodo 是傳給了 <Header addTodo={this.addTodo}/>
    */

    // checkAllTodo 用於全選
    checkAllTodo = (done)=>{ // 傳上 done值 到 checkAllTodo函數 裡面，告訴頁面全選還是全不選
        //獲取原來的 todos
        const {todos} = this.state
        // 加工數據
        const newTodos = todos.map((todoObj)=>{
            return {...todoObj,done} // 當拿到 todoObj 對象時，把所有的 done值 改為 true
            // 但是，done:true 會把代碼寫死，會導致代碼只能夠 全選，而不能 全取消，所以需傳上 done值 到 checkAllTodo函數 裡面
        })
        // 更新狀態
        this.setState({todos:newTodos}) // 把原來的 todos 更新為 加工數據的 newTodos
    }

   // deleteTodo 用於刪除一個 todo 對象
    deleteTodo = (id)=>{
        // 獲取原來的 todos
        const {todos} = this.state // 解構賦值，從狀態中讀取改 todos
        // 刪除指定 id 的 todo 對象
        const newTodos = todos.filter((todoObj)=>{ // 從數組裡面刪除指定 id 的元素，透過使用 filter 數組的過濾
            // 拿到的每一個項目都是 todoObj
            return todoObj.id !== id // 該 return 的條件是 todoObj.id 不等於我傳過來的 id，就可以把它返回去，如等於就過濾掉
            /**
             * 過濾的條件如下：
             * 如果是需要刪除 id 為 002 的項目
             * 1. 過濾的條件就是把所有的 id，不是 002 的返回，而 002 的則不返回
             * 上面的方法就可以把它們過濾掉，因此過濾掉了就等於把它刪除了
             */
        })
        // 更新狀態 - 驅動頁面的顯示
        this.setState({todos:newTodos})
    }

    // clearAllDone 用於清除所有已完成的
    clearAllDone = ()=>{
        //獲取原來的 todos
        const {todos} = this.state
        //過濾數據 - 把所有 done值 是 true 的，都把它們過濾掉
        const newTodos = todos.filter((todoObj)=>{ // 拿到的每一個都是 todoObj
            return !todoObj.done // 因為要清除那些已經完成的，所以要把它們直接刪掉，就可以接到一個新的數組 newTodos
        })
        //更新狀態
        this.setState({todos:newTodos})
    }

    render() { // App 是所有東西的父組件，它可以給任何組件傳任何東西

        const {todos} = this.state

        return (
            <div className="todo-container">
            <div className="todo-wrap"> {/** todo 的包裹容器 */}
            <Header addTodo={this.addTodo}/>
            <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/> {/** 因為 App 和 item 是祖孫關係， 所以需要先傳給父親 */}
            <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone}/> {/** 有多少個打勾的選擇，代表有多少個選框的 done值 為 true */}
            {/** 原來怎麼給 List 傳，就怎麼給 footer 傳，而當你傳遞了，就要接，所以我們要到 Footer組件 去接收 todos */}
            </div>
        </div>
        )
    }
}
