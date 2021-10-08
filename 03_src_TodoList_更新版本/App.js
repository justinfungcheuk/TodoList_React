import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'
// 引入包有原則： 第三方的包往上靠，自己的包往下靠，樣式 css 一般放到最後

/* App 是所有組件的父組件，也就是說 App 是 Footer / Header / Item / List 的父組件，所以 App 可以給任何子組件傳東西
父子組件傳遞東西，可以透過 props 傳遞，讓子組件做出展示。例如： App父組件傳遞東西到List子組件，由List展示
而且子組件都可以用 todos 的數據，但當子組件之間都沒有共同的交互，我們就要把有關的數據放到子組件共同的App父組件裡面保存。
所以 todos 要做的一堆事情必須要放在 App 狀態裡面。
*/
export default class App extends Component {
// 狀態在那裡，操作狀態的方法就在那裡 ！！！！！！！！！！！！！！！！ 也就是說 addTodo，updateTodo，checkAllTodo，deleteTodo，clearAllDone 這是方法！！！！！！！！！！！！！
// 但是，操作的方法在 App 裡面，並不代表 App 要用這些方法，而是要視乎 App 把這些方法給了誰。例如：addTodo 方法就給了 Header。   <Header addTodo={this.addTodo}/>

    //初始化狀態
    state = {todos:[ // todos 是一個對象，不是一個名字 name， name 只是對象裡面的一個屬性
        {id:'001',name:'吃飯',done:true}, 
        // 由於吃飯也是有自己的狀態，我們可以標識它是完成還是沒完成，所以不能直接用字符串 todos:['吃飯']表達該事情，因此它必須是一個 todo 對象
        // 例如：吃飯是第一件事，定義它的 id 為 '001'，名字 name:'吃飯'，而屬性 done 標識吃飯這件事是完成還是沒完成，就用 done 屬性，它的值是 true 表示完成，值為 false 表示沒完成
        {id:'002',name:'睡覺',done:true},
        {id:'003',name:'打代碼',done:false},
        {id:'004',name:'逛街',done:true},
    ]}
    /* 我們要把 todos 傳遞給展示的組件 例如：<List todos={todos} />，
    而且當你把 todos傳遞給了 List組件，就要在 List組件 裡面接上 todos，<List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
    */

    /* ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
     * 整體的交互模型如下：
     * App 裡面存儲著一堆要做的事情，
     * App 傳遞給 List
     * App 傳給了 Header 一個函數，而該函數能夠接收一個 todoObj
     * Header組件在合適的時候，調用了當時 App父組件 傳給它的那個函數，然後再把 todoObj 交給你 App組件，
     * 而 App組件 在拿到這個 todoObj 後，放到自己的狀態裡，就會導致 App組件 的更改，App組件 狀態更改後，就會重新調用 App組件 裡面的render，
     * 當 App組件 裡面的 render 一重新調用，由於 List組件 是 App組件 的子組件，所以就會引發 List子組件 的重新渲染，
     * 最後就會生成一個 新的 todoObj
     * 以上就是整體的交互模型！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
     */
    
    //addTodo 用於添加一個 todo，接收的參數是 todo 對象 = todoObj
    addTodo = (todoObj)=>{ // todo 是一整個對象， 包括：id，name，done 例如： {id:'001',name:'吃飯',done:true}, 而名字 name 只是對象裡面的一個屬性
        /*所以要先拿到原來的一堆 todo，
        {id:'001',name:'吃飯',done:true}, 
        // 由於吃飯也是有自己的狀態，我們可以標識它是完成還是沒完成，所以不能直接用字符串 todos:['吃飯']表達該事情，因此它必須是一個 todo 對象
        // 例如：吃飯是第一件事，定義它的 id 為 '001'，名字 name:'吃飯'，而屬性 done 標識吃飯這件事是完成還是沒完成，就用 done 屬性，它的值是 true 表示完成，值為 false 表示沒完成
        {id:'002',name:'睡覺',done:true},
        {id:'003',name:'打代碼',done:false},
        {id:'004',name:'逛街',done:true},
        在原來的一推 todo 的前方，把它們傳過來新的 todoObj 裡面
        */
        // 獲取原 todos
        const {todos} = this.state
        // 在 {todos} 的前方， 追加一個 todo。 而 {todos} 代表的是原來的 todo數組 （在第17行代碼的整個 todos）
        const newTodos = [todoObj,...todos] 
        /* [todoObj,...todos]  代表構建出一個新的數組
           而新的數組的最前方 todoObj 代表新傳進來的東西， 後面的 ...todos 代表原來數組的東西，因此一個新的 todo 就創建好了
           newTodos 的 new 並不是代表創造誰的實例，而是追加一個 todo，例如：{id:'',name:'',done:}, 
        */

        // 更新狀態, 因為 newTodos需要更新狀態才可以放進去 初始化狀態，把它更新狀態
        this.setState({todos:newTodos}) // 所以需要把加工完的數組 newTodos 放到 todos裡面
        /**
         * 因此，只要傳遞了 todoObj，也就是 一個 todo 對象，而這個對象包含了 id，name，done，就可以把 todo 對象 放進去 const newTodos = [todoObj,...todos] 
         * 而且是放到列表的最前方。
         * 總結以上的 addTodo，我們要把它傳給 Header，<Header addTodo={this.addTodo}/> 
         */
    }

    // uodateTodo 用於更新一個 todo 對象 - 代表勾選 或 取消勾選 一個 todo，而該 updateTodo 是傳給 item 的
    updateTodo = (id,done)=>{ // id 代表你要改的人是誰，done 代表該東西完成了 還是 沒完成， (id,done) 是一個形参
        // 獲取狀態中的 todos
        const {todos} = this.state
        /* 匹配處理數據,如果是一樣的就把你更改。（也就是說要從 todos數組 裡面一個一個的查找，id是多少 例如：001 或 002 是不一樣的，而 003 是一樣的），這種情況我們就要用 遍歷 來查找，
        把查找到的指定項目，把它更改，也就是把 todo 加工，把裡面指定項的指定屬性更改 
        */
        const newTodos = todos.map((todoObj)=>{ // newTodos 代表這是一個新的 todos，而拿到的每一個項目為 todoObj
            /* 如果當前的 todoObj 身上的 id 和 我們傳過來的 id 是一樣的，就代表它們匹配上了
               匹配後了， 我們需要返回 todoObj的值 和 更改 done值
               return {...todoObj,done} 也就是代表當匹配上了， 所以匹配上了，就會返回一個新的對象，而裡面的 done值會被更改
            */
            if(todoObj.id === id) return {...todoObj,done} // 由於上面用了 updateTodo = (done)=>{}，所以不用寫成 done:done，直接寫上簡寫方式 done 就可以
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

    

    /* 不建議直接使用 delete 來定義，因為 delete 是一個關鍵字，用於刪除某一個對象裡面的指定屬性。
    例如：我有一個對象為 let obj = {a:1, b:2}
    如果我們想刪除 a 屬性，我們可以寫成 delete obj.a
    */

   // deleteTodo 用於刪除一個 todo 對象
    deleteTodo = (id)=>{
        // 獲取原來的 todos
        const {todos} = this.state // 解構賦值，從狀態中讀取 todos
        // 刪除指定 id 的 todo 對象
        const newTodos = todos.filter((todoObj)=>{ // 從數組裡面刪除指定 id 的元素，透過使用 filter 數組的過濾 （數組身上有一個 filter 稱為過濾）
            // 拿到的每一個項目都是 todoObj
            // 過濾的條件是：如果說明了是想刪除 id 為 002 的那個，它的過濾的條件就是把那些所以 id 不是 002 的返回，002 的不返回，就會把它給過濾掉，也就刪除了。
            // 所以 return 的條件是 todoObj.id 不等於我傳過來的 id，就可以把它返回去，如等於就過濾掉。
            return todoObj.id !== id // 該 return 的條件是 todoObj.id 不等於我傳過來的 id，就可以把它返回去，如等於就過濾掉
            /**
             * 過濾的條件如下：
             * 如果是需要刪除 id 為 002 的項目
             * 1. 過濾的條件就是把所有的 id，不是 002 的返回，而 002 的則不返回
             * 上面的方法就可以把它們過濾掉，因此過濾掉了就等於把它刪除了
             */
        })
        // 更新狀態 - 驅動頁面的顯示，把原來的 todos 改為新的 newTodos
        this.setState({todos:newTodos})
    }

    // checkAllTodo 用於全選
    checkAllTodo = (done)=>{ // 傳上 done值 到 checkAllTodo函數 裡面，告訴頁面全選還是全不選
        //獲取原來的 todos
        const {todos} = this.state // 從狀態中讀取 todos，用 const 解構賦值
        // 加工數據
        const newTodos = todos.map((todoObj)=>{ // 遍歷，拿到的每一個都是 todoObj
            // 因為有 return返回值，就可以接到一個新的 newTodos， 

            // ...todoObj 複製原有的 todoObj
            return {...todoObj,done} // 當拿到 todoObj 對象時，把所有的 done值 改為 true
            // 但是，done:true 會把代碼寫死，會導致代碼只能夠 全選，而不能 全取消，所以需傳上 done值 到 checkAllTodo函數 裡面，告訴代碼你是全選還是全不選
        })
        // 更新狀態
        this.setState({todos:newTodos}) // 把原來的 todos 更新為 加工完成數據的 newTodos
    }

    // clearAllDone 用於清除所有已完成的
    clearAllDone = ()=>{
        //獲取原來的 todos
        const {todos} = this.state
        //過濾數據 - 把所有 done值 是 true 的，都把它們過濾掉，用數組上的方法 filter
        const newTodos = todos.filter((todoObj)=>{ // 拿到的每一個都是 todoObj
            // 過濾的條件是把某個對象交出去，所以要寫成 todoObj.done === false 或 !todoObj.done， 因為要清除那些已經完成的
            return !todoObj.done // 因為要清除那些已經完成的，所以要把它們直接刪掉，就可以接到一個新的數組 newTodos
        })
        //更新狀態
        this.setState({todos:newTodos}) //把原來的 todos，替換成 newTodos
    }

    render() { // App 是所有東西的父組件，它可以給任何組件傳任何東西

        const {todos} = this.state

        return (
            <div className="todo-container">
            <div className="todo-wrap"> {/** todo 的包裹容器 */}
            {/** Header ，List 和 Footer 之間是兄弟組件關係，兄弟組件之間也可以傳遞組件 */}
            <Header addTodo={this.addTodo}/>
            <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/> {/** 因為 App 和 item 是祖孫關係， 所以需要先傳給 List組件 */}
            {/** 因為 todos 提前寫了 const {todos} = this.state，所以它不用寫上 this.todos */}
            <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone}/> {/** 有多少個打勾的選擇，代表有多少個選框的 done值 為 true */}
            {/** 原來怎麼給 List 傳，就怎麼給 footer 傳，而當你傳遞了，就要接，所以我們要到 Footer組件 去接收 todos */}
            </div>
        </div>
        )
    }
}
